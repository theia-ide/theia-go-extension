# Theia - GO Extension


This extension uses the [GO Language Server](https://github.com/theia-ide/go-language-server) to provide LSP features.

To install GO Language Server on Ubuntu 16.04:

First install GO following the instructions [here](https://golang.org/doc/install).

Then install the dependencies needed:

```
go get -u -v github.com/ramya-rao-a/go-outline
go get -u -v github.com/acroca/go-symbols
go get -u -v github.com/nsf/gocode
go get -u -v github.com/rogpeppe/godef
go get -u -v golang.org/x/tools/cmd/godoc
go get -u -v github.com/zmb3/gogetdoc
go get -u -v github.com/golang/lint/golint
go get -u -v github.com/fatih/gomodifytags
go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs
go get -u -v golang.org/x/tools/cmd/gorename
go get -u -v sourcegraph.com/sqs/goreturns
go get -u -v github.com/cweill/gotests/...
go get -u -v golang.org/x/tools/cmd/guru
go get -u -v github.com/josharian/impl
go get -u -v github.com/haya14busa/goplay/cmd/goplay
```

## License
[Apache-2.0](https://github.com/theia-ide/theia/blob/master/LICENSE)
