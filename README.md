# GIPHY Infinite Search Feed

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
Having a performant app is virtually always a real requirement. The biggest bottleneck in this project was the size of the images themselves as they can reach up to several MBs. The webp format definitely helps reduce the overhead but I did several things that I believe trick the user into thinking that the app works "faster":
1. Fetching the smallest with the lowest quality image first: rendering a low-quality placeholder provides the ability to preview the image when waiting for the big blobs to be fetched.
2. Fetching the original gif in the background: taking advantage of making concurrent requests for images. The exception here is that this is not done for images that have been rendered during scrolling (scrolling has to stop for both requests to be made). This is intentional (and greedy in a way) because this reduces the number of requests made if the user scrolls uncontrollably. It generally improves performance but could also be seen as a downside because it tracks scrolling and is optimistic that the user would stop scrolling.
3. Windowing: here it is primarily used to render only what needs to visible which furthermore decreases the number of requests made. It does improve performance if the feed gets too big but I would not say that this is that big of an issue for this project. It also brings a big downside - all layout is computed with JS which is a generally worse alternative and introduces complications.

I have also tried to keep the bundle size to a minimum by not introducing too many and too big dependencies.

Here are some benchmarks to back up all of this theory:

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

### Configureable
All modules have been written with the mindset that every constant configuration is changeable.
  
