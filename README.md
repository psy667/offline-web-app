# offline-web-app
Simple example offline web app with Angular, Apollo, RxDB

apollo-link-retry - повтор запроса при неудаче
apollo-link-queue - при отсутствии подкючения складывает запросы в очередь
apollo-link-serialize - сериализует запросы чтобы исполнить их в нужном порядке после восстановления подключения
apollo-cache-persist - сохраняет запросы на диск
apollo-link-error - перехватывает ошибки запросов
apollo-upload-client - загрузка файлов через graphql