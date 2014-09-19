SRC = $(wildcard lib/*/*.js)
STYL = $(wildcard lib/*/*.css)

build: $(SRC) $(STYL)
	@./bin/build -e ./lib/boot/index.js --paths lib -s ./lib/boot/boot.css

serve:
	@./bin/serve -e ./lib/boot/index.js --paths lib -s ./lib/boot/boot.css

install: package.json
	@npm install

clean:
	rm -fr build

.PHONY: clean
