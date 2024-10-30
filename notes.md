# Finding Normal Vectors

## Formula:
a * b

Nx = AyBz - AzBy
Ny = AzBx - AxBz
Nz = AxBy - AyBx

## Points to use - example:
A = (1, 0, 0)
B = (0, 1, 0)
C = (0, 0, 1)

## Steps:

### 1. Edges calculation - if you don't have vector values:
edge 1 = B - A:
(Bx - Ax, By - Ay, Bz - Az)

edge 2 = C - A
(Cx - Ax, Cy - Ay, Cz - Az)

Edge1 = B - A = (0 - 1, 1 - 0, 0 - 0) = <ins>(-1, 1, 0)</ins>

Edge2 = C - A = (0 - 1, 0 - 0, 1 - 0) = <ins>(-1, 0, 1)</ins>


### 2. Cross Product calculation
Edge1 * Edge2:

NormalX = Ay * Bz - Az * By
NormalY = Az * Bx - Ax * Bz
NormalZ = Ax * By - Ay * Bx

NormalX = (Ay * Bz) - (Az * By) = (1 * 1) - (0 * 0)     = <ins>1</ins>
NormalY = (Az * Bx) - (Ax * Bz) = (0 * -1 ) - (-1 * 1 ) = <ins>1</ins>
NormalZ = (Ax * By) - (Ay * Bx) = (-1 * 0) - (1 * -1)   = <ins>1</ins>

Normal Vector = (1, 1, 1)

## 3. Normalize the Normal Vector(OPTIONAL):
## a.
Magnitude = $$\sqrt{NormalX^2 + NormalY^2 + NormalZ^2}$$

$$\sqrt{1^2 + 1^2 + 1^2}$$
$$\sqrt{3}$$

## b.
Unit Normal = ($$\frac{NormalX}{Magnitude}$$, $$\frac{NormalY}{Magnitude}$$, $$\frac{NormalZ}{Magnitude}$$)

(1 / $$\sqrt{3}$$, 1 / $$\sqrt{3}$$, 1 / $$\sqrt{3}$$)


## Drag Controls
// Set up Drag Controls
const dragControls = new DragControls([cube], camera, renderer.domElement);

// Restrict cube movement along the normal vector
dragControls.addEventListener('drag', (event) => {
    const dragDistance = cube.position.clone().sub(position).dot(normal);
    cube.position.copy(position).add(normal.clone().multiplyScalar(dragDistance));
});




