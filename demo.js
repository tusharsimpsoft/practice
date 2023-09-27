fun getObjectIdsByObjectLocationId(objectLocationId: String):
            Set<String> {
        val objectIds = mutableSetOf<String>()
        val parentObjectLocationIds = mutableSetOf(objectLocationId)
        val objectLocationIds = mutableSetOf<String>()

        // Get Object Location IDS
        while(parentObjectLocationIds.isNotEmpty()) {
            val locId = parentObjectLocationIds.first()
            val locIdResponse = db.getRecordInBatch(tableName = Constants.objectLocationTable,
                indexName = "parentObjectLocationId-index",
                keyName = Constants.parentObjectLocationId,
                keyValue = locId,
                columnName = Constants.objectLocationID)

            for(item in locIdResponse.items()) {
                parentObjectLocationIds.add(item[Constants.objectLocationID]!!.s())
            }

            objectLocationIds.add(locId)
            parentObjectLocationIds.remove(locId)
        }

        // Get Object IDS
        for(locId in objectLocationIds) {
            val response = db.getRecordInBatch(tableName = Constants.objectTable,
                indexName = "objectLocationId-index",
                keyName = Constants.objectLocationID,
                keyValue = locId,
                columnName = Constants.objectKeyName)

            for(item in response.items()) {
                objectIds.add(item["objectId"]!!.s())
            }
        }

        println("-".repeat(20))
        println("ObjectIds: $objectIds")

        return objectIds
    }
}