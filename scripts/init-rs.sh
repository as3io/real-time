#!/bin/bash
echo "Starting replica set initialize"
until mongo --host mongo01 --eval "print(\"waited for connection\")"
do
    sleep 2
done
echo "Connection finished"
echo "Creating replica set"
mongo --host mongo01 <<EOF
rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "mongo01:27017" },
      { _id : 1, host : "mongo02:27017" },
      { _id : 2, host : "mongo03:27017" }
    ]
  }
)
EOF
echo "replica set created"
