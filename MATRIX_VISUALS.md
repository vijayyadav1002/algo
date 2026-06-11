# Matrix Algorithms — Visual Memory Guide

> Companion to [MATRIX_CODE.md](./MATRIX_CODE.md). Pictures first, code second.
> Every section follows the same arc: **the problem in plain words → the trap →
> the mechanism → a slow-motion trace → one sentence to remember → check yourself.**
> Answers to all check-yourself exercises are at the [bottom](#answers).

---

## 1. Number of Islands — "Find land, sink it, count it"

### The problem in plain words

You're given a map. `1` = land, `0` = water. An **island** is a group of `1`s
connected **up/down/left/right** — diagonals do NOT connect:

```
  1 1 0 0 1
  1 0 0 0 1        How many islands?  →  3
  0 0 1 0 0
            ▲
  the lone 1 at (2,2) touches the right island only DIAGONALLY → separate island
```

The answer is not "how many 1s" — it's "how many **groups** of 1s".

### The trap

Scan every cell and `count++` on each `1`? You'd get 5 above, not 3, because
one island contains many `1`s. The real question: *standing on a `1`, how do I
know whether it belongs to an island I already counted?*

The trick: **destroy the evidence.** The moment you discover an island, erase
the *entire* island from the map before moving on. Then every `1` you ever see
later is guaranteed to be brand-new.

### The two players

1. **The scanner** (the double `for` loop) — reads the grid like a book.
   One job: *"Is this a `1`? New island! `count++`, call the demolition crew."*
2. **The demolition crew** (`dfs`) — given one land cell, erases it and every
   land cell connected to it, spreading in 4 directions like water through paper.

```
            dfs(r-1, c)   ↑
                          │
  dfs(r, c-1) ◄── [r][c] ──► dfs(r, c+1)        STOP if: off the grid
                          │                              or cell ≠ '1'
            dfs(r+1, c)   ↓                     else: sink, recurse 4 ways
```

### Slow-motion trace

```
  r0:  1 1 0
  r1:  1 0 0
  r2:  0 0 1
```

**Scanner at (0,0): it's a `1`. New island → `count = 1`, call `dfs(0,0)`.**
Neighbors are tried in code order: down, up, right, left.

```
 dfs(0,0): '1' → sink it                1 1 0      0 1 0
                                        1 0 0  →   1 0 0
                                        0 0 1      0 0 1
 │
 ├─ DOWN  → dfs(1,0): '1' → sink        0 1 0
 │  │                                   0 0 0
 │  │                                   0 0 1
 │  ├─ down  dfs(2,0): '0' water → return
 │  ├─ up    dfs(0,0): it's '0' NOW → return   ◄── sinking saved us!
 │  ├─ right dfs(1,1): '0' → return            without it, (1,0) and (0,0)
 │  └─ left  dfs(1,-1): off grid → return      would call each other forever
 │
 ├─ UP    → dfs(-1,0): off grid → return
 │
 ├─ RIGHT → dfs(0,1): '1' → sink        0 0 0
 │  │                                   0 0 0
 │  │                                   0 0 1
 │  └─ all 4 neighbors: water / off-grid / already sunk → return
 │
 └─ LEFT  → dfs(0,-1): off grid → return
```

The crew is done. The whole island is gone — and **the scanner hasn't moved
yet.** The scanner pauses at (0,0) until the entire DFS finishes.

**Scanner resumes:** (0,1) `0`, (0,2) `0`, (1,0) `0`, (1,1) `0`, (1,2) `0`,
(2,0) `0`, (2,1) `0` — all the old land is sunk; the scanner glides over it.

**Scanner at (2,2): `1`.** It can only still be a `1` if no previous DFS
reached it → not connected to anything counted. `count = 2`, sink, done.

### Why sinking does double duty

| Problem | How `grid[r][c] = '0'` fixes it |
|---|---|
| Infinite recursion: (0,0) visits (1,0), which visits (0,0), ... | By the time a neighbor calls back, the cell is already `'0'` → instant return |
| Scanner recounting an island it already saw | Counted islands no longer exist on the map |

No separate `visited` set needed — the grid itself is the visited tracker.

### The one sentence

> `count++` doesn't count *land cells* — it counts *"first time I've ever
> touched this island"* moments. Sinking guarantees exactly one such moment per island.

### Check yourself

How many islands, and why?

```
  1 0 1
  1 0 1
  1 1 1
```

**Hook:** 🌊 *sink what you count.*

---

## 2. Flood Fill — same skeleton, but PAINT instead of sink

### The problem in plain words

The MS Paint bucket tool. Click a pixel; every pixel of the **same color**
reachable up/down/left/right from it gets repainted with `newColor`.

### The mechanism

Identical 4-way DFS to Islands. The only differences:

- Islands erases (`'1' → '0'`); Flood Fill repaints (`original → newColor`)
- Islands stops at "not `'1'`"; Flood Fill stops at "not `originalColor`"

### Slow-motion trace

`floodFill(image, sr=0, sc=0, newColor=2)`, original color = `1`:

```
  1 1 0
  1 0 1

 dfs(0,0): color 1 → paint 2            2 1 0
 │                                      1 0 1
 ├─ DOWN  → dfs(1,0): 1 → paint 2       2 1 0
 │  │                                   2 0 1
 │  ├─ down  (2,0): off grid → return
 │  ├─ up    (0,0): already 2 ≠ original → return   ◄── painting = visited mark
 │  ├─ right (1,1): 0 ≠ original → return
 │  └─ left  (1,-1): off grid → return
 │
 ├─ UP    → off grid → return
 ├─ RIGHT → dfs(0,1): 1 → paint 2       2 2 0
 │  │                                   2 0 1
 │  └─ all neighbors: painted / wall / off-grid → return
 └─ LEFT  → off grid → return
```

Final image — note `(1,2)` stays `1`: it touches the region only diagonally.

```
  2 2 0
  2 0 1
```

### The trap

```
  ⚠ originalColor === newColor, no guard:
  paint cell 1 → 1 ... "is it still originalColor?" YES → recurse forever

  Guard FIRST: if (original === new) return image;
```

Islands never needs this guard because sinking always *changes* the value
(`'1' → '0'`). Painting might not change anything — that's the whole danger.

### The one sentence

> Flood Fill is Number of Islands with the eraser swapped for a brush — and a
> brush needs the same-color guard because painting a cell its own color marks nothing.

### Check yourself

Same image, but `floodFill(image, sr=1, sc=2, newColor=9)`. What does the
image look like after?

```
  1 1 0
  1 0 1
```

**Hook:** 🎨 *paint, but guard same-color.*

---

## 3. Rotate Image — "Transpose, then mirror"

### The problem in plain words

Turn the whole `n×n` grid 90° clockwise, **without** allocating a second grid.
Where each value lands: `(i, j) → (j, n-1-i)` — but don't memorize that.
Memorize two physical motions instead.

### The mechanism

```
   ORIGINAL          ① TRANSPOSE            ② REVERSE EACH ROW
   1 2 3             (flip across ↘)        (mirror left↔right)
   4 5 6      ──►    1 4 7           ──►    7 4 1
   7 8 9             2 5 8                  8 5 2
                     3 6 9                  9 6 3      = rotated 90° CW ✓
```

```
  CW  = Transpose → Reverse rows        ("T then R — TuRn right")
  CCW = Reverse rows → Transpose        (same moves, opposite order)
```

### Slow-motion trace

Transpose = swap across the ↘ diagonal. Only **three swaps** happen for 3×3
(the diagonal `1 5 9` never moves):

```
  swap (0,1)↔(1,0):  2↔4       1 4 3        swap (0,2)↔(2,0):  3↔7     1 4 7
                               2 5 6                                   2 5 6
                               7 8 9                                   3 8 9

  swap (1,2)↔(2,1):  6↔8       1 4 7        then reverse each row:    7 4 1
                               2 5 8                                  8 5 2
                               3 6 9                                  9 6 3
```

Track one element to convince yourself: `3` lives at (0,2). Rotated 90° CW it
must land at (2,2). Transpose moves it to (2,0); reversing row 2 slides it to
(2,2). ✓

### The trap

```
  ⚠ Why does the transpose loop start at j = i + 1?

  If j ran over ALL j ≠ i:   swap (0,1)↔(1,0)  →  2↔4    (good)
                             swap (1,0)↔(0,1)  →  4↔2    (UNDONE!)

  Visit only the triangle ABOVE the diagonal → each pair swapped exactly once.
```

### The one sentence

> Rotation is two mirrors: flip across the diagonal, then flip left-to-right —
> and only walk the upper triangle or every swap cancels itself.

### Check yourself

(a) In a 4×4 matrix, where does the element at (0,0) end up after a CW rotation?
(b) What two moves produce a 180° rotation?

**Hook:** 🔄 *Transpose → Reverse = TuRn right.*

---

## 4. Set Matrix Zeroes — first row/col as a control panel

### The problem in plain words

Wherever there's a `0`, the entire row **and** entire column containing it
must become `0` — in place.

### The trap

Do it naively in one pass and your freshly written zeroes look like *original*
zeroes — they cascade and wipe the whole matrix. You must separate
**recording where zeroes were** from **applying the damage**.

The honest solution stores two boolean arrays: `rowHasZero[m]`, `colHasZero[n]`.
The O(1)-space trick: **the matrix's own first row and column become those arrays.**

```
        col markers ──► ┌───────────┐
                        │ ◆  ◆  ◆  ◆ │   first row  = "zero this column?"
        row markers ──► │ ◆  ░  ░  ░ │   first col  = "zero this row?"
                        │ ◆  ░  ░  ░ │   ░ interior = real data
                        └───────────┘
```

### Slow-motion trace

```
   1  2  3  4
   5  0  7  8        the single 0 at (1,1) should wipe row 1 and column 1
   9 10 11 12
```

**Pass 0 — save the flags FIRST.** Does row 0 contain a real zero? No →
`firstRowZero = false`. Column 0? No → `firstColZero = false`.
(Why first: pass 1 is about to scribble marks into row 0 / col 0. After that,
you can't tell an original zero from a mark.)

**Pass 1 — MARK.** Scan the interior (r ≥ 1, c ≥ 1). Found `0` at (1,1) →
stamp its row-marker `matrix[1][0] = 0` and col-marker `matrix[0][1] = 0`:

```
   1 [0] 3  4        ◄── marks written into the control panel
  [0] 0  7  8
   9 10 11 12
```

**Pass 2 — APPLY (interior only).** For each interior cell, look up at its
column marker and left at its row marker:

```
  (1,2): row marker matrix[1][0]=0 → zero      1  0  3  4
  (1,3): row marker = 0            → zero      0  0  0  0
  (2,1): col marker matrix[0][1]=0 → zero      9  0 11 12
```

**Pass 3 — edges LAST.** `firstRowZero`/`firstColZero` are both false → leave
row 0 and col 0 alone (their `0`s are *marks*, not data... and notice the mark
at `matrix[0][1]` is *correct* output anyway — column 1 should be zero).

Final: row 1 and column 1 wiped. ✓

### Why the order is sacred

```
  flags BEFORE marking   → or a mark gets misread as "row 0 had a zero"
                            and you wrongly wipe the whole first row
  interior BEFORE edges  → zero the control panel early and you can no
                            longer read which rows/columns were marked
```

### The one sentence

> Record first, apply second, edges last — and photograph the control panel
> (the two flags) before you scribble on it.

### Check yourself

The only zero is at (0,2) — in the marker row itself:

```
  1 2 0
  4 5 6
  7 8 9
```

Pass 1 scans only the interior, so it never "marks" anything. How do row 0
and column 2 still get zeroed correctly?

**Hook:** 🎛 *first row/col = control panel; edges last.*

---

## 5. Unique Paths — Pascal's triangle wearing a grid costume

### The problem in plain words

Robot starts top-left, wants bottom-right, moves only **right** or **down**.
Count the distinct routes. For a 3×3 grid there are exactly 6:

```
  →→↓↓    →↓→↓    →↓↓→    ↓→→↓    ↓→↓→    ↓↓→→
```

### The mechanism

You can only *enter* a cell from above or from the left, so:

```
  paths(r,c) = paths(above) + paths(left)

  1───1───1───1        first row/col = 1
  │   │   │   │        (only one route: a straight line)
  1───2───3───4
  │   │   │   │            3 = 1 + 2
  1───3───6──10            ▲       (above + left)
                          10 = 4 + 6  ◄── answer for 3×4
```

Fill the table top-to-bottom, left-to-right; the bottom-right cell is the answer.

### Slow-motion trace (the 1D space trick)

You never need the whole table — only the previous row. Even better, one array
updated in place. For `m = 3, n = 3`:

```
  start (this IS row 0):        dp = [1, 1, 1]

  row 1, c=1:  dp[1] += dp[0]   dp = [1, 2, 1]
               ▲above=1  ▲left=1      (2 = 1+1)
  row 1, c=2:  dp[2] += dp[1]   dp = [1, 2, 3]
                                      (3 = 1+2)

  row 2, c=1:  dp[1] += dp[0]   dp = [1, 3, 3]
  row 2, c=2:  dp[2] += dp[1]   dp = [1, 3, 6]

  answer: dp[n-1] = 6 ✓   (matches the 6 routes listed above)
```

Why one `+=` covers both directions: at the moment you touch `dp[c]`, it still
holds **last row's value** (= above), and `dp[c-1]` was already updated this
sweep (= left). Old value + fresh neighbor = above + left.

With obstacles: an obstacle cell hard-resets `dp[c] = 0` — no paths flow
through a wall — and everything downstream of it inherits the loss naturally.

### The one sentence

> Every cell = above + left; the 1D array works because `dp[c]` *is* "above"
> until the moment you add the freshly updated `dp[c-1]` ("left").

### Check yourself

Trace `dp` for `m = 2, n = 4`. What's the final array and the answer?

**Hook:** 🔺 *Pascal: above + left.*

---

## 6. Spiral Matrix — four walls closing in

### The problem in plain words

Read the matrix the way you'd peel an onion: across the top, down the right
side, back across the bottom, up the left side — then repeat one layer in.

### The mechanism

Four boundary variables. Each directional pass consumes one wall, then that
wall moves inward:

```
  top ──►  ┌► ► ► ► ►┐          PASS ORDER (always this cycle):
           ▲ ┌► ► ►┐ ▼          1. left→right along TOP,    then top++
           ▲ ▲ ┌►┐ ▼ ▼          2. top→bottom along RIGHT,  then right--
           ▲ └◄ ◄ ◄┘ ▼          3. right→left along BOTTOM, then bottom--
  bottom─► └◄ ◄ ◄ ◄ ◄┘          4. bottom→top along LEFT,   then left++
           ▲         ▲          repeat while top ≤ bottom && left ≤ right
         left      right
```

### Slow-motion trace

```
   1  2  3  4
   5  6  7  8        boundaries start: top=0  bottom=2  left=0  right=3
   9 10 11 12
```

| Step | Action | Emits | Boundaries after |
|---|---|---|---|
| 1 | walk TOP row, left→right | `1 2 3 4` | top=1 |
| 2 | walk RIGHT col, top→bottom | `8 12` | right=2 |
| 3 | guard `top(1) ≤ bottom(2)` ✓ → BOTTOM row, right→left | `11 10 9` | bottom=1 |
| 4 | guard `left(0) ≤ right(2)` ✓ → LEFT col, bottom→top | `5` | left=1 |
| 5 | loop check: top=1 ≤ bottom=1, left=1 ≤ right=2 → continue | | |
| 6 | walk TOP row (now the middle) | `6 7` | top=2 |
| 7 | RIGHT col: `r` from top(2) to bottom(1) — empty range, emits nothing | — | right=1 |
| 8 | guard `top(2) ≤ bottom(1)` ✗ → **SKIP bottom pass** | — | bottom=0 |
| 9 | guard `left(1) ≤ right(1)` ✓ → LEFT col: `r` from bottom(0) down to top(2) — empty | — | left=2 |
| 10 | loop check: top=2 > bottom=0 → **stop** | | |

Output: `1 2 3 4 8 12 11 10 9 5 6 7` ✓

### The trap — why the two `if` guards exist

Step 8 is the whole story. After pass 6 ate the last row (`6 7`), `top++` made
`top > bottom`. Without the guard, pass 3 would walk **right-to-left over that
same row** and emit `7 6` again:

```
  leftover single row:    6 7        pass 1 emits → 6 7, top++
                          ▲───┘      unguarded pass 3 emits ← 7 6   DUPLICATES!
```

Passes 1 and 2 never need guards — the `while` condition already vouches for
them. Passes 3 and 4 run *after* `top++` and `right--` changed the world.

### The one sentence

> Eat a wall, shrink that wall — and re-check the world before walls 3 and 4,
> because walls 1 and 2 just moved.

### Check yourself

Trace a single column `[[1],[2],[3]]`. What's emitted, and which of the two
guards prevents a duplicate?

**Hook:** 🧱 *eat a wall, shrink that wall; check before walls 3 & 4.*

---

## 7. Search a 2D Matrix II — staircase from the TOP-RIGHT

### The problem in plain words

Every **row** is sorted left→right and every **column** is sorted top→bottom
(but the matrix as a whole is *not* one sorted list). Find `target` fast.

### Why the corner choice IS the algorithm

Stand on any cell and ask: "I'm too big / too small — which way do I move?"

```
  TOP-LEFT corner (value 1):  target 5 is bigger... but BOTH right
  and down increase the value. Two candidate moves → no information. ✗

  TOP-RIGHT corner (value 11): moving LEFT shrinks, moving DOWN grows.
  The two moves DISAGREE → every comparison picks exactly one. ✓
```

(Bottom-left works for the same reason, mirrored. Top-left and bottom-right
are the dead corners.)

### Slow-motion trace

```
  rows sorted →, cols sorted ↓        START HERE ──┐  target = 5
                                                   ▼
   1   4   7  11                       1   4   7 [11]   11 > 5 → ◄ go left
   2   5   8  12                                          (col 3 is all ≥ 11 — dead)
   3   6   9  16                       1   4  [7] 11     7 > 5 → ◄ go left
                                       1  [4]  7  11     4 < 5 → ▼ go down
                                       2  [5]  8  12     5 = 5 → FOUND ✓
```

The elimination logic, spelled out:

```
  cell > target → everything BELOW in this column is even bigger → kill column (c--)
  cell < target → everything LEFT in this row is even smaller    → kill row    (r++)
```

Each step permanently retires a full row or a full column. With `m` rows and
`n` columns to retire, the walk is at most `m + n` steps → O(m+n). A missing
target walks you off the bottom-left edge, and the `while` ends → `false`.

### The one sentence

> Start at the corner where the two moves disagree; every comparison then
> kills an entire row or column.

### Check yourself

Same matrix, `target = 9`. Write the cell-by-cell path the staircase takes.

**Hook:** 🪜 *staircase from top-right; every step kills a row or column.*

---

## One-page memory anchor

```
  ISLANDS      🌊 sink what you count          FLOOD FILL   🎨 paint, guard same-color
  ROTATE       🔄 Transpose → Reverse = TuRn   ZEROES       🎛 first row/col = control panel
  UNIQUE PATHS 🔺 Pascal: above + left         SPIRAL       🧱 4 walls close in
  SEARCH II    🪜 staircase from TOP-RIGHT     (each step kills a row or column)
```

| If you blank on... | Replay this movie |
|---|---|
| Islands vs Flood Fill | Same 4-way DFS. Sink vs paint. Paint needs the same-color guard. |
| Why no double-counting | Counted islands are erased — a surviving `1` is always a new island. |
| Rotate direction | "TuRn right": Transpose → Reverse. CCW is the same two moves swapped. |
| Zeroes pass order | Flags first, mark, apply interior, edges LAST. |
| 1D DP update | `dp[c]` is still "above" until you `+=` the fresh `dp[c-1]` ("left"). |
| Spiral guards | Leftover single row/col: walls 3 & 4 need `if` checks or you re-walk it. |
| Which corner to search from | The corner where the two moves disagree: top-right (or bottom-left). |

---

## Answers

1. **Islands:** `1`. The bottom row joins the two vertical strips. The DFS
   from (0,0) goes down the left strip, and at (2,0) its RIGHT neighbor (2,1)
   is land → it crosses the bottom and climbs the right strip, sinking everything.
2. **Flood Fill:** only `(1,2)` changes (`1 → 9`). Its up neighbor (0,2) is `0`
   and its left neighbor (1,1) is `0` — it's diagonal to the big region, and
   diagonals don't connect. Result: `1 1 0 / 1 0 9`.
3. **Rotate:** (a) `(0,0) → (0,3)` — top-left goes to top-right (formula
   `(i,j) → (j, n-1-i)` with n=4). (b) 180° = reverse every row AND reverse
   every column (or: run transpose+reverse twice).
4. **Zeroes:** `firstRowZero` is computed by scanning the *actual* row 0, so
   it catches (0,2) → pass 3 wipes row 0. And the zero at `matrix[0][2]` sits
   exactly where a column-2 *marker* would go — so pass 2 reads it as "zero
   column 2" and wipes (1,2) and (2,2). The marker row marks itself for free.
5. **Unique Paths:** `dp` starts `[1,1,1,1]`; the single sweep of row 1 gives
   `[1,2,3,4]` → answer **4**. (Sanity check: in a 2-row grid your only choice
   is *which column you drop down at* — 4 columns, 4 paths.)
6. **Spiral:** emits `1 2 3`. Pass 1 takes `1` (top=1), pass 2 takes `2 3`
   (right=-1). The `left(0) ≤ right(-1)` guard fails and **skips pass 4** —
   otherwise it would climb back up the same column emitting `2` again.
7. **Search II:** `(0,3)=11 > 9 → left`, `(0,2)=7 < 9 → down`,
   `(1,2)=8 < 9 → down`, `(2,2)=9` → found in 4 probes.
