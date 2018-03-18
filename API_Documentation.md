## API Overview

**Get All Messages**
**URL**: /api/messages
**Returns**: All messages in database, regardless of state.
**Method**: GET
**Data Params**: None
**URL Params**: None
**Success Response**:
		-Code: 200
		-Content: {1:{ message: 'testMessage0', id: 0, state:1, checkout_time:null, creation_date:0}}

----------

**Get Available Messages**
**URL**: /api/available-messages
**Returns**: All messages in database with a state of 1 (Available). Will not return any messages that are checked out by a user.
**Method**: GET
**Data Params**: None
**URL Params**: None
**Success Response**:
		-Code: 200
		-Content: {1:{ message: 'testMessage0', id: 0, state:1, checkout_time:null, creation_date:0}}

----------

**Create Message**
-Creates a message with the given string message, and autogenerates a hashed id for the message.
**URL**: /api/messages
**Returns**: None
**Method**: POST
**Data Params**: Required:  {message:[string]}
**URL Params**: None
**Success Response**:
		-Code: 200

----------

**Checkout Message**
-Sets state of message with id to checked-out. Begins timer for checkout expiration.
**URL**: /api/checkout
**Returns**:   None
**Method**: POST
**Data Params**: Required:  {id:[number]}
**URL Params**: None
**Success Response**:
		-Code: 200


----------


**Checkin Message**
	-Accepts and validates checked-out message id, before deleting from database.
**URL**: /api/checkin
**Returns**: None
**Method**: POST
**Data Params**: Required:  {id:[number]}
**URL Params**: None
**Success Response**:
		-Code: 200


----------


**Delete Message**
	-Deletes Message from database.
**URL**: /api/checkin
**Returns**: None
**Method**: POST
**Data Params**: Required:  {id:[number]}
**URL Params**: None
**Success Response**:
		-Code: 200
