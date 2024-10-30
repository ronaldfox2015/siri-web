## DEPLOY VARS ##
ACCOUNT_ID      ?= 929226109038
DEPLOY_REGION   ?= eu-west-1
DESIRED_COUNT   ?= 1
MIN_SCALING     ?= 1
MAX_SCALING     ?= 2
MEMORY_SIZE     ?= 256
AUTOSCALING     ?= false
HTTP_PRIORITY	?= 24
HTTPS_PRIORITY	?= 24

BUILD_NUMBER    ?= $(shell date +%s)
BUILD_TIMESTAMP ?= 20220216
TAG_DEPLOY      ?= $(BUILD_TIMESTAMP).$(BUILD_NUMBER)

DEPLOY_IMAGE    = $(PROJECT_NAME):$(TAG_DEPLOY)
DEPLOY_REGISTRY = $(ACCOUNT_ID).dkr.ecr.$(DEPLOY_REGION).amazonaws.com
STACK_PATH      = $(INFRA_BUCKET)/build/cloudformation/$(OWNER)/$(ENV)/$(PROJECT_NAME)

sync-deploy-config: ##Deploy Sync deploy files from S3
	aws s3 sync s3://$(INFRA_BUCKET)/config/deploy/$(OWNER)/$(ENV)/$(SERVICE_NAME)/ deploy/ --profile $(ENV)

tag.build:
	echo $(TAG_DEPLOY)

build-image-deploy: ##@Deploy Create a Docker image with the dependencies packaged
	make login-aws
	docker build -f docker/deploy/Dockerfile --no-cache --build-arg IMAGE=$(IMAGE_DEV) -t $(DEPLOY_IMAGE) .

login-aws: ##Deploy Login to AWS
	aws ecr get-login-password --region $(DEPLOY_REGION) --profile $(ENV) | docker login --username AWS --password-stdin $(ACCOUNT_ID).dkr.ecr.$(DEPLOY_REGION).amazonaws.com

deploy:
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/":/${APP_DIR} \
		-v 	~/.ssh:/root/.ssh \
		${IMAGE_DEPLOY_DEV} \
		



