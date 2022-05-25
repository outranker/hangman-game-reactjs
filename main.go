package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

func main() {

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
