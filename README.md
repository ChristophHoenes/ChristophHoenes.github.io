# Canvas Template

## API

**`createCanvas(canvasElem)`**

takes:
- `canvasElem`: html canvas

returns:
- canvas object with the following methods:
`getRandomCoords`, `getGridCoords`, `getTwoSidedCoords` and `draw`.


### Generating coordinates

#### **`canvas.getRandomCoords(numberOfElems, elemSize)`**

    ----------------
    |      x    o  |
    |  x           |
    |        o     |
    |   o       x  |
    |      o     o |
    ----------------

Generates `numberOfElems` random coordinates for a canvas with elements of `elemSize`.

takes:
- `numberOfElems` (int): the number of elemets
- `elemSize` (int): the size of a single element


#### **`canvas.getGridCoords(numberOfRows, numberOfElems, elemSize)`**

    ----------------
    |              |
    |    оооооо    |
    |    оxxxxx    |
    |    xxxxxx    |
    |              |
    ----------------

Generates `numberOfElems` grid coordinates with `numberOfRows` rows and `numberOfElems` / `numberOfRows` columns.

takes:
- `numberOfRows` (int): the number of rows in the grid (might create one more if the numberOfElem / rows is not an int)
- `numberOfElems` (int): the number of elemets
- `elemSize` (int): the size of a single element


#### **`canvas.getTwoSidedCoords(numberOfRows, gap, numberOfElems, elemSize, direction)`**

    ------------------
    |                |
    |    ооо  ооо    |
    |    оxx  xxx    |
    |    xxx  xxx    |
    |                |
    ------------------

Generates `numberOfElems` split grid coordinates with `numberOfRows` rows and `numberOfElems` / `numberOfRows` columns.

takes:
- `numberOfRows` (int): the number of rows in the grid (might create one more if the numberOfElem / rows is not an int)
- `gap` (int): the gap between the two sides
- `numberOfElems` (int): the number of elemets
- `elemSize` (int): the size of a single element
- `direction` (string): the direction specifies how the items are placed on the canvas (can be: 'row', 'column' or 'sideRow')


direction: 'row'


    ----------------
    |              |
    |   ооо  ооо   |
    |   оxx  xxx   |
    |   xxx  xxx   |
    |              |
    ----------------


direction: 'sideRow'


    ----------------
    |              |
    |   ооо  xxx   |
    |   ооо  xxx   |
    |   оxx  xxx   |
    |              |
    ----------------
 

direction: 'column'


    ----------------
    |              |
    |   ооо  xxx   |
    |   ооx  xxx   |
    |   ооx  xxx   |
    |              |
    ----------------


### Drawing on the canvas

#### **`canvas.draw(shape, size, x, y, color)`**

Draws a single element on the canvas of `shape` shape, `color` color and `size` the center of which is on coordinates `x` and `y`.

takes:
- `shape` (string): the shape of the element ('circle', 'sqaure', 'triangle')
- `size` (int): the size of the element
- `x` (int): x coordinate
- `y` (int): y coordinate
- `color` (string): the fill color of the element
