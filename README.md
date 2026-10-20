# Wanderlust — Kubernetes, CI/CD and GitOps

A containerized blogging application deployed to Kubernetes, using Jenkins for continuous integration and Argo CD for GitOps configuration.

![DevSecOps and GitOps workflow](Assets/DevSecOps%2BGitOps.gif)

## Technology Stack

- MERN stack
- Docker
- Kubernetes and Minikube
- Jenkins
- Argo CD
- MongoDB and Redis
- Terraform

## Deployment Evidence

### Application

![Wanderlust application](Assets/app.png)

### Frontend Image Build

![Frontend image build](Assets/frontend%20image%20build.png)

### Backend Image Build

![Backend image build](Assets/backend%20image%20build.png)

### Containers and Images

![Containers created](Assets/containers%20created.png)

![Images created](Assets/images%20created.png)

### Kubernetes

![Kubernetes pod status](Assets/pods%20status.png)

![MongoDB pod](Assets/mongo%20pod%20created.png)

### Argo CD

![Argo CD installation](Assets/agro%20installtion.png)

## Jenkins CI Pipeline

The root Jenkinsfile defines source checkout, backend tests, frontend build, Kubernetes manifest validation, dependency audits, and artifact archiving.

## GitOps

The Argo CD application manifest is at `GitOps/argocd/wanderlust-application.yaml`. It targets the `main` branch and the `kubernetes/` directory. Automated sync is not currently enabled.

## Repository Structure

- `Assets/` — screenshots and workflow image
- `backend/` — backend application
- `frontend/` — frontend application
- `kubernetes/` — Kubernetes manifests
- `GitOps/` — Argo CD configuration
- `terraform/` — Terraform configuration
- `Jenkinsfile` — CI pipeline

## Check Deployment

```bash
minikube status
kubectl get nodes
kubectl get deployments,services,pods -n wanderlust
```

## Scope

This README documents the local Kubernetes deployment and the configuration present in the repository. Production AWS EKS deployment, automated image publishing, and zero-downtime releases are not claimed as verified.

## License

See [LICENSE](LICENSE).
