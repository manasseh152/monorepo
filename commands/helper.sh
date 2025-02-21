# Usage: helper.sh <docker_compose_file> <container_name> <script_location> <command>

DOCKER_COMPOSE_FILE="$1"
CONTAINER_NAME="$2"
SCRIPT_LOCATION="$3"
COMMAND_TO_RUN="$4"

if [ $# -ne 4 ]; then
  echo "Error: Missing arguments."
  echo "Usage: $0 <docker_compose_file> <container_name> <script_location> <command>"
  exit 1
fi

docker compose -f "$DOCKER_COMPOSE_FILE" run --rm "$CONTAINER_NAME" bash -c "cd $SCRIPT_LOCATION && $COMMAND_TO_RUN"