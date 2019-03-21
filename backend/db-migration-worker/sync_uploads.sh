#!/usr/bin/env bash
set -e

for var in "SSH_USERNAME" "SSH_HOST" "UPLOADS_DIRECTORY"
do
  if [[ -z "${!var}" ]]; then
    echo "${var} is undefined"
    exit 1
  fi
done

rsync --archive --update --verbose ${SSH_USERNAME}@${SSH_HOST}:${UPLOADS_DIRECTORY}/* /uploads/
