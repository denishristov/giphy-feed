# GIPHY Infinite Search Feed

![ezgif com-optimize](https://user-images.githubusercontent.com/22468578/71350932-20387f00-257b-11ea-8acd-201917bf6dd6.gif)

Live at: https://giphy-feed.herokuapp.com/

## How to run
1. Create a `.env` file with content in the root of the project:
```
REACT_APP_GIPHY_API_KEY=<your_api_key>
```
2. Run `yarn`
3. Run `yarn start`

## How to test 
1. Run `yarn test .`

### Code coverage:
<img width="811" alt="Screenshot 2019-12-23 at 2 26 53" src="https://user-images.githubusercontent.com/22468578/71329420-aaf28d00-252d-11ea-8930-a74bbd4f3dc8.png">

## Challenges and what I focused on solving (in no order)

### Code quality, maintainability, and testability
Although having a robust code structure for such a small project might be considered "overengineering" I decided to include TypeScript as the language of choice. I believe no scalable web app is maintainable without TS and the received benefits, especially in the long term, are definitely worth investing in. I have also spent a little more time decoupling my modules so they are easier to read, maintain and test.

### Performance
Having a performant app is virtually always a real requirement. The biggest bottleneck in this project was the size of the images themselves as they can reach up to several MBs. The mp4 format definitely helps reduce the overhead but I did several things that I believe trick the user into thinking that the app works "faster":
1. Fetching the smallest with the lowest quality image first: rendering a low-quality placeholder provides the ability to preview the image instead of only waiting for the big blobs to be fetched.
2. Windowing: here it is primarily used to render only what needs to visible which furthermore decreases the number of requests made. It does improve performance if the feed gets too big but I would not say that this is that big of an issue for this project. It also introduces a big downside - all layout is computed with JS which is a generally worse alternative and introduces complications.

I have also tried to keep the bundle size to a minimum by not introducing too many and too big dependencies.

Here are some benchmarks to back up some of this theory:

#### Lighthouse Audit:
<img width="400" alt="Screenshot 2019-12-23 at 1 52 04" src="https://user-images.githubusercontent.com/22468578/71330507-26f0d300-2536-11ea-8619-d14e66341603.png">

#### Chrome performance profile:
<img width="1528" alt="Screenshot 2019-12-23 at 3 41 01" src="https://user-images.githubusercontent.com/22468578/71330506-26f0d300-2536-11ea-88f3-e4268df0fac2.png">

#### Average FPS: 53-57.

### Responsiveness
The app has been made with both mobile and desktop devices in mind. Both the grid view and list view respect the viewport's width. The grid view dynamically collapses columns if is unable to display all of them.

<img width="1792" alt="Screenshot 2019-12-23 at 3 48 32" src="https://user-images.githubusercontent.com/22468578/71330725-37ee1400-2537-11ea-8d40-518bf548556a.png">
<img width="1182" alt="Screenshot 2019-12-23 at 3 48 36" src="https://user-images.githubusercontent.com/22468578/71330726-37ee1400-2537-11ea-9129-84aaf00929dd.png">
<img width="238" alt="Screenshot 2019-12-23 at 3 49 08" src="https://user-images.githubusercontent.com/22468578/71330727-3886aa80-2537-11ea-8aa7-0005d682ba44.png">

### Easy configuration
All modules have been written with the mindset that every constant configuration is changeable.

## Explaining some decisions

### mp4 over gif and webp 
After experimenting with all 3 I found out that:
1. webps were generally smaller in size compared to gifs (up to 4.2 times)
2. mp4 were generally smaller in size compared to webps (up to 2.2 times)

Here are some netwrok inspections with 8 images as evidence.
#### 8 gifs - 31.8 MB
<img width="890" alt="Screenshot 2019-12-23 at 14 04 29" src="https://user-images.githubusercontent.com/22468578/71358599-300f8d80-2592-11ea-90bf-63895ff2329e.png">

#### 8 webps - 7.8 MB
<img width="890" alt="Screenshot 2019-12-23 at 14 05 38" src="https://user-images.githubusercontent.com/22468578/71358602-300f8d80-2592-11ea-9e0e-e7522531bdc3.png">


#### 8 mp4s - 3.5 MB
<img width="886" alt="Screenshot 2019-12-23 at 14 00 54" src="https://user-images.githubusercontent.com/22468578/71358600-300f8d80-2592-11ea-91ad-dc89398f8200.png">

Overall I'm happy with sticking with mp4.

### React
React is the perfect framework for such a small project because:
- comes with only basic functionality out of the box (compared to all the junk Angular comes with)
- has (one of if not) the largest community behind it (as of today)
- I have the most experience with it
- supports hooks which they are great for 2 things: reducing boilerplate and composing/reusing state modules

### What I would do if this was a real production app
- use a masonry for the grid view because it looks fancier and deserves the engineering overhead
- add metrics to measure api latency, popular searches and user interactions with gifs
- use GIPHY autocomplete and trending API's to provide a better search expereience
- have a designer design a better UI :D
