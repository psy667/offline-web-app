```mutation createMessage {
  createMessage(input: {user: "", text: "", image?: ""}) {
    user
    text
    image
    id
    date
  }
  
}

mutation deleteMessage {
  deleteMessage(id: "") {
  	id
	}
}

query getMessages {
  messages {
    user
    text
    image
    id
    date
  }
}
```
