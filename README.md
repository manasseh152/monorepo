# Repo

## Pre-requisites

- [Bun](https://bun.sh) - Bun is a fast JavaScript all-in-one toolkit
- [Docker](https://www.docker.com) - Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers
- [Docker Compose](https://docs.docker.com/compose) - Compose is a tool for defining and running multi-container Docker applications

## Installation (Linux only for now)

- chmod `commands/helper.sh` to make it executable

  ```bash
  chmod +x commands/helper.sh # use sudo if necessary
  ```

- Install the project dependencies

  ```bash
  bun install
  ```

- Run migrations

  ```bash
  bun dev:db:migrate
  ```

- Run the project

  ```bash
  bun dev:start
  ```
