STACK_NAME=realestate-crawler
BUCKET_NAME=serabalint-deployment-crawler
REGION=eu-central-1

.PHONY: deploy

install:
	cd crawler; \
	npm install; 
	
test: install
	cd crawler; \
	npm test;


bucket:
	aws s3 mb s3://$(BUCKET_NAME) --region $(REGION)

deploy:
	# before deploy, remove dev dependencies
	cd crawler; npm prune --production;
	sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $(BUCKET_NAME)
	sam deploy --template-file packaged.yaml --stack-name $(STACK_NAME) --capabilities CAPABILITY_IAM --region $(REGION)

invoke:
    cd crawler; cat test_events/event.json| docker run -i -e DOCKER_LAMBDA_USE_STDIN=1 -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_LAMBDA_FUNCTION_TIMEOUT=100 --rm -v `pwd`:/var/task lambci/lambda:nodejs8.10


destroy:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(REGION)
	aws s3 rb s3://$(BUCKET_NAME) --force --region $(REGION)

