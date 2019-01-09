include .env
export

STACK_NAME=realestate-crawler-$(ENV)
BUCKET_NAME=serabalint-crawler-depl-$(ENV)
TABLE_NAME=real-estate-$(ENV)
REGION=eu-west-1

.PHONY: deploy

check-env:
ifndef ENV
  $(error ENV is undefined)
endif
ifndef RECIPIENTS
	$(error RECIPIENTS is undefined)
endif

testenvs: check-env
	echo $(STACK_NAME);
	echo $(TABLE_NAME)

install:
	 for d in crawler dynamo_streamer;\
	  do \
	   cd $d;\
	   npm install;\
	   cd ..;\
	 done;

bucket:
	aws s3 mb s3://$(BUCKET_NAME) --region $(REGION)

local-db-create:
	aws dynamodb create-table --table-name $(TABLE_NAME) --attribute-definitions AttributeName=ID,AttributeType=S --key-schema AttributeName=ID,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000

local-db-drop:
	aws dynamodb delete-table --table-name $(TABLE_NAME) --endpoint-url http://localhost:8000

deploy:
	# before deploy, remove dev dependencies
	 for d in crawler dynamo_streamer; \
	   do \
	   cd $d; \
	   npm prune --production; \
	   cd ..; \
	 done
	sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $(BUCKET_NAME)
	sam deploy --template-file packaged.yaml --stack-name $(STACK_NAME) --capabilities CAPABILITY_IAM --region $(REGION) --parameter-overrides Environment=$(ENV) Recipients=$(RECIPIENTS)

invoke:
	echo invoking $(func)
	cd $(func); \
	cat test_events/event.json| docker run -i -e DOCKER_LAMBDA_USE_STDIN=1 -e AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) -e AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) -e AWS_LAMBDA_FUNCTION_TIMEOUT=100 -e TABLE=$(TABLE_NAME) -e AWS_DYNAMO_ENDPOINT=http://host.docker.internal:8000 -e AWS_REGION=eu-central-1 -e ALWAYS_RUN=1 --rm -v `pwd`:/var/task lambci/lambda:nodejs8.10

destroy:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(REGION)
	aws s3 rb s3://$(BUCKET_NAME) --force --region $(REGION)


