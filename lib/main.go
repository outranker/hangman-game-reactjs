package main

import (
	"context"
	"fmt"
	"log"
	"syscall/js"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

var c chan bool

// init is called even before main is called. This ensures that as soon as our WebAssembly
// module is ready in the browser, it runs and prints "Hello, webAssembly!"
// to the console. It then proceeds to create a new channel. The aim of this channel is
// to keep our Go app running until we tell it to abort.
func init() {
	fmt.Println("Hello, WebAssembly!")
	c = make(chan bool)
}

func main() {

	// here, we are simply declaring the our function `sayHelloJS` as a global JS function.
	// That means we can call it just like any other JS function.
	js.Global().Set("sayHelloJS", js.FuncOf(SayHello))
	println("Done.. done.. done...")

	// tells the channel we created in init() to "stop".
	<-c

	// create context  -> , chromedp.WithDebugf(log.Printf)
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	res, err := myfunc(ctx)
	if err != nil {
		fmt.Println(err)
	}

	log.Println("THIS IS THE RESULT: >>>>>>>>>>>>>", res)

}

func myfunc(ctx context.Context) ([]string, error) {
	var cancel func()
	ctx, cancel = context.WithTimeout(ctx, 1000*time.Second)
	defer cancel()
	fmt.Println("BEFORE NAVIGATE >>>>>>>>>>>>>>>>>>>>>>>>")
	// navigate
	if err := chromedp.Run(ctx, chromedp.Navigate(`https://google.com`)); err != nil {
		return nil, fmt.Errorf("could not navigate to google: %v", err)
	}
	fmt.Println("BEFORE WAITVISIBLE >>>>>>>>>>>>>>>>>>>>>>>>")
	// wait until google search input is visible
	if err := chromedp.Run(ctx, chromedp.WaitVisible(`//input[@name="q"]`)); err != nil {
		return nil, fmt.Errorf("google search input is not visible for some reason: %v", err)
	}

	fmt.Println("BEFORE SENDKEYS >>>>>>>>>>>>>>>>>>>>>>>>")
	// now use SendKey function to type search query
	if err := chromedp.Run(ctx, chromedp.SendKeys(`//input[@name="q"]`, `great meaning`)); err != nil {
		return nil, fmt.Errorf("inputting search keyword is erroring: %v", err)
	}

	fmt.Println("BEFORE SUBMIT >>>>>>>>>>>>>>>>>>>>>>>>")
	// some enter submit button
	if err := chromedp.Run(ctx, chromedp.Submit(`//input[@name="q"]`)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}

	fmt.Println("BEFORE WAITVISIBLE >>>>>>>>>>>>>>>>>>>>>>>>")
	// wait until search result is visible
	if err := chromedp.Run(ctx, chromedp.WaitVisible("div.vmod", chromedp.ByQuery)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}
	// if err := chromedp.Run(ctx, chromedp.WaitVisible(`//body`)); err != nil {
	// 	return nil, fmt.Errorf("submit throws an error: %v", err)
	// }
	fmt.Println("BEFORE NODES >>>>>>>>>>>>>>>>>>>>>>>>")
	var projects []*cdp.Node
	// just dump everything to r
	if err := chromedp.Run(ctx, chromedp.Nodes(`div.vmod div[data-dobid="dfn"] span`, &projects)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}

	l := make([]string, len(projects))

	for i, val := range projects {
		fmt.Println(val.Children[0].NodeValue)
		l[i] = val.Children[0].NodeValue
	}

	return l, nil

}

// SayHello simply set the textContent of our element based on the value it receives
// (i.e the value from the input box)
// the element MUST exist else it'd throw an exception
func SayHello(jsV js.Value, inputs []js.Value) interface{} {
	fmt.Println("this is jsV", jsV)
	fmt.Println("this is inputs", inputs)
	message := inputs[0].String()
	h := js.Global().Get("document").Call("getElementById", "message")
	h.Set("textContent", message)
	return nil
}

/* this main function includes browser as well*/
// func main() {

// 	opts := append(
// 		// select all the elements after the third element
// 		chromedp.DefaultExecAllocatorOptions[3:],
// 		chromedp.NoFirstRun,
// 		chromedp.NoDefaultBrowserCheck,
// 	)
// 	// create chromedp's context
// 	parentCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
// 	defer cancel()

// 	// create context  -> , chromedp.WithDebugf(log.Printf)
// 	ctx, cancel := chromedp.NewContext(parentCtx)
// 	defer cancel()

// 	res, err := myfunc(ctx)
// 	if err != nil {
// 		fmt.Println(err)
// 	}

// 	log.Println("THIS IS THE RESULT: >>>>>>>>>>>>>", res)

// }
