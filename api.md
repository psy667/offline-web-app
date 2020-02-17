```mutation createMessage {
  createMessage(input: {user: "", text: "", image: "", date: ""}) {
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
