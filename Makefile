SRC = $(wildcard lib/*/*.js)
STYL = $(wildcard lib/*/*.css)

build: $(SRC) $(STYL)
	@./bin/build

serve:
	@node server

install: package.json
	@npm install

clean:
	rm -fr build

.PHONY: clean
