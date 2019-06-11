package lib

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func ReadFromLocalFile(fpath string) {
	// 打开文件
	f, err := os.Open(fpath)
	if err != nil {
		panic("文件读取失败")
	}
	defer f.Close()
	// buffer逐行读取
	buffer := bufio.NewReader(f)
	for {
		line, _, eof := buffer.ReadLine()
		if eof == io.EOF {
			break
		}
		fmt.Println("each line", line)
	}
}
