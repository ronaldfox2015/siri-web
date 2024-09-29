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

deploy-image: deploy-validate-registry ##@Deploy Push image to aws ECR
	docker tag $(DEPLOY_IMAGE) $(DEPLOY_REGISTRY)/$(DEPLOY_IMAGE)
	aws ecr get-login-password --region $(DEPLOY_REGION) --profile $(ENV) | docker login --username AWS --password-stdin $(ACCOUNT_ID).dkr.ecr.$(DEPLOY_REGION).amazonaws.com
	docker push $(DEPLOY_REGISTRY)/$(DEPLOY_IMAGE) >> pushImage

imagescan:
	$(eval IMAGEID := $(shell cat pushImage | grep digest | awk '{print $$3}'))
	python3.8 ../../scripts/py/ecr/scanImage.py --id=${IMAGEID} --owner=${OWNER} --env=${ENV} --service=${SERVICE_NAME} --imagedeploy=$(DEPLOY_IMAGE)

deploy-validate-registry: ##@Deploy Create registry in aws ECR service
	$(eval EXIST_REPOSITORY := $(shell aws ecr \
		describe-repositories \
		--repository-name $(PROJECT_NAME) \
		--profile $(ENV) \
		--region $(DEPLOY_REGION) \
		| grep "repositoryName" \
		| sed 's/repositoryName//g'\
		| sed 's/://g'| sed 's/,//g'| sed 's/ //g'| sed 's/"//g'))
	if [ "$(EXIST_REPOSITORY)" != "$(PROJECT_NAME)" ]; then \
		$(info "Create repository $(PROJECT_NAME) in the region $(DEPLOY_REGION)...") \
		aws cloudformation deploy \
			--template-file ./cloudformation/registry.yml \
			--stack-name $(PROJECT_NAME)-registry \
			--parameter-overrides \
				ProjectName=$(PROJECT_NAME) \
			--region $(DEPLOY_REGION) \
			--profile $(ENV) \
			--capabilities CAPABILITY_IAM; \
	fi

deploy-stack: deploy-sync-cloudformation ##@Deploy Deploy updating the stack
	aws cloudformation deploy \
	--template-file ./cloudformation/master.yml \
	--stack-name $(PROJECT_NAME)-service \
	--parameter-overrides \
		S3Path=$(STACK_PATH) \
		HttpListenerPriority=$(HTTP_PRIORITY) \
		DesiredCount=$(DESIRED_COUNT) \
		MaxScaling=$(MAX_SCALING) \
		MinScaling=$(MIN_SCALING) \
		Image=$(DEPLOY_REGISTRY)/$(DEPLOY_IMAGE) \
		ServiceName=$(SERVICE_NAME) \
		Env=$(ENV) \
		Owner=$(OWNER) \
		PathPrefix=$(PATH_PREFIX) \
		ContainerPort=$(CONTAINER_PORT) \
		MemorySize=$(MEMORY_SIZE) \
	--region $(DEPLOY_REGION) \
	--profile $(ENV) \
	--capabilities CAPABILITY_NAMED_IAM

deploy-sync-cloudformation: ##@Deploy Sync additional cloudformation resources in S3
	aws s3 sync ./cloudformation/stacks s3://$(STACK_PATH) --profile $(ENV)

deploy-ecs: ##@Deploy Deploy updating the service
	aws ecs register-task-definition --region $(DEPLOY_REGION) --profile $(ENV) \
		--region $(DEPLOY_REGION) \
		--family $(PROJECT_NAME) \
		--task-role-arn $(OWNER).$(ENV).$(SERVICE_NAME).ecs \
		--container-definitions "[{\"name\":\"$(PROJECT_NAME)\",\"essential\":true,\"memory\":$(MEMORY_SIZE),\"portMappings\":[{\"protocol\":\"tcp\",\"containerPort\":80,\"hostPort\":0}],\"environment\":[{\"name\":\"PREFIX\",\"value\":\"$(PREFIX_PATH)\"}],\"image\":\"$(DEPLOY_REGISTRY)/$(DEPLOY_IMAGE)\",\"logConfiguration\":{\"logDriver\":\"awslogs\",\"options\":{\"awslogs-group\":\"$(PROJECT_NAME)\",\"awslogs-region\":\"$(DEPLOY_REGION)\"}}}]" \
		--profile ${ENV} \
		--query taskDefinition.taskDefinitionArn
	aws ecs update-service --cluster $(CLUSTER) --service $(PROJECT_NAME) --task-definition $(PROJECT_NAME) --desired-count $(DESIRED_COUNT) --region $(DEPLOY_REGION) --profile $(ENV)
