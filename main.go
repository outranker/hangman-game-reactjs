package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

func main() {
	
// create context  -> , chromedp.WithDebugf(log.Printf)
ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithDebugf(log.Printf))
defer cancel()

res, err := myfunc(ctx)
if err != nil {
	fmt.Println(err)
}

log.Println("THIS IS THE RESULT: >>>>>>>>>>>>>", res)

}

func myfunc(ctx context.Context) ([]*cdp.Node, error) {
	var cancel func()
	ctx, cancel = context.WithTimeout(ctx, 25*time.Second)
	defer cancel()

	// navigate
	if err := chromedp.Run(ctx, chromedp.Navigate(`https://google.com`)); err != nil {
		return nil, fmt.Errorf("could not navigate to google: %v", err)
	}

	// wait until google search input is visible
	if err := chromedp.Run(ctx, chromedp.WaitVisible(`//input[@name="q"]`)); err != nil {
		return nil, fmt.Errorf("google search input is not visible for some reason: %v", err)
	}
	
	

	// now use SendKey function to type search query
	if err := chromedp.Run(ctx, chromedp.SendKeys(`//input[@name="q"]`, `great meaning`)); err != nil {
		return nil, fmt.Errorf("inputting search keyword is erroring: %v", err)
	}


	// some enter submit button
	if err := chromedp.Run(ctx, chromedp.Submit(`//input[@name="q"]`)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}


	// wait until search result is visible
	if err := chromedp.Run(ctx, chromedp.WaitVisible(`//div[contains(@class,"main")]`)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}
	// if err := chromedp.Run(ctx, chromedp.WaitVisible(`//body`)); err != nil {
	// 	return nil, fmt.Errorf("submit throws an error: %v", err)
	// }

	var projects []*cdp.Node
	// just dump everything to r
	if err := chromedp.Run(ctx, chromedp.Nodes(`//div[contains(@class,"main")]/*`, &projects)); err != nil {
		return nil, fmt.Errorf("submit throws an error: %v", err)
	}

for _, v2 := range projects {
	empJSON, err := json.Marshal(v2)
    if err != nil {
        log.Fatalf(err.Error())
    }

    //MarshalIndent
    empJSON, err = json.MarshalIndent(v2, "", "  ")
    if err != nil {
        log.Fatalf(err.Error())
    }
    fmt.Printf("MarshalIndent funnction output %s\n", string(empJSON))
		
		// fmt.Println("**********", v, v2)
	
}

	return projects, nil


}
