start:
	cd parks; \
	npm start run; \
	echo "The website loads on localhost 3000";

backend:
	cd server; \
	go run app.go; \
	echo "The backend has started";
