network-setup:
	docker network create log-app-network || true
	docker network create db-access-app-network || true

build-client:
	docker volume create nodemodules_main_app_frontend
	docker-compose -f ./main-app/client/docker-compose-builder.yml run --rm install
	docker-compose -f ./main-app/client/docker-compose-builder.yml run --rm build

dev:
	$(MAKE) network-setup
	$(MAKE) build-client
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

prod-build:
	$(MAKE) build-client
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-bl-main-app:latest -f ./main-app/Dockerfile ./main-app
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-bl-support-app:latest -f ./support-app/Dockerfile ./support-app
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-nginx:latest -f ./nginx/Dockerfile ./nginx

prod-push:
	$$(aws2 ecr get-login --no-include-email --region eu-central-1)
	aws2 s3 cp docker-compose.yml s3://gkc-bproject-app-docker-composes/business-logic/docker-compose.yml
	aws2 s3 cp docker-compose.prod.yml s3://gkc-bproject-app-docker-composes/business-logic/docker-compose.prod.yml
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-bl-main-app
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-bl-support-app
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-nginx
