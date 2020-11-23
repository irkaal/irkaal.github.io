---
title: 'tibble: A Simple Data Frame in R'
description: The tibble package provides a modern alternative to data frame by keeping only what works. In other words, it is a simpler and improved data frame. Here's why.
authorName: Alvin N.
date: '30 Aug. 2020'
thumbnail: 'assets/blog/tibble-a-simple-data-frame-in-r/tibble.webp'
published: true
---



## What is a tibble?

According to the tibble [documentation](https://tibble.tidyverse.org), a tibble, or `tbl_df`, is a modern reimagining of the `data.frame`, keeping what time has proven to be effective, and throwing out what is not. 

### Why "tibble"?

Maybe it is because "tibble" is how New Zealanders (like Hadley) pronounce the word "table" &#128514;.

[![](assets/blog/tibble-a-simple-data-frame-in-r/tibble-rstudio-community.webp)](https://community.rstudio.com/t/why-on-earth-is-it-called-tibble/26569/4)

On the other hand, maybe it's New Zealand for data frame &#128517;.

<iframe class="p-3" src="https://www.youtube.com/embed/gjpNEVcG1nU?start=505" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Joking aside, I believe a tibble is a simple data frame that improves on the behavior of the traditional data frame through [inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)).


## The `tbl_df` class

Before I explain the differences between tibble and the traditional data frame, I would like to first explain how tibble can alter some behaviors of the traditional data frame.

```r
class(tibble())
#> [1] "tbl_df"     "tbl"        "data.frame"
```

A tibble is a data frame with the `tbl_df` class. We can think of `tbl` as a tibble and `df` as a data frame. So `tbl_df` is like a tibble that stores its data in a data frame.

The `tbl_df` class inherits from the `tbl` class which in turn inherits from the `data.frame` class. This means that `tbl_df` is a subclass of `data.frame` and the behaviors of `data.frame` are passed down to `tbl_df` through this inheritance chain.

This allows `tbl_df` to behave like a `data.frame` and to alter the behaviors of a traditional data frame, such as printing and subsetting.



## Creating a tibble

There are different ways to create a tibble. The common ways are through the `tibble()` and `tribble()` functions.

I will create the following table using the two functions: 

|x| y|
|-|--|
|1| 4|
|2| 5|
|3| 6|


### Creating using `tibble()`

We can use `tibble()` just like how we use `data.frame()`.

If we use the `tag = value` form, the column name is created based on `tag`:

```r
tibble(x = 1:3, y = 4:6)
#> # A tibble: 3 x 2
#>       x     y
#>   <int> <int>
#> 1     1     4
#> 2     2     5
#> 3     3     6
```

If we use the `value` form, the column name is created based on the `value`'s deparsed argument:

```r
x <- 1:3
y <- 4:6
tibble(x, y)
#> # A tibble: 3 x 2
#>       x     y
#>   <int> <int>
#> 1     1     4
#> 2     2     5
#> 3     3     6
```

### Creating using `tribble()`

We can use `tribble()` for row-wise tibble creation which makes the code more readable.

```r
tribble(
  ~x, ~y,
  1,  4,
  2,  5,
  3,  6
)
#> # A tibble: 3 x 2
#>       x     y
#>   <dbl> <dbl>
#> 1     1     4
#> 2     2     5
#> 3     3     6
```

We use the `~name` syntax in the first row for the column names and followed by the value rows.


### Repairing column names

By default, `data.frame()` munges duplicate column names to produce unique names:

```r
data.frame(x = 1:3, x = 4:6)
#>   x x.1
#> 1 1   4
#> 2 2   5
#> 3 3   6
```

`tibble()` does not munge column names, but it will give a warning output:

```r
tibble(x = 1:3, x = 4:6)
#> Error: Column name `x` must not be duplicated.
#> Use .name_repair to specify repair.
#> Run `rlang::last_error()` to see where the error occurred.
```

`tibble()` has a `.name_repair` argument which allows us to specify how we can resolve the duplicate column names.

By default, `.name_repair` is set to `"check_unique"` which just ensures that there are unique columns and does not attempt to repair if there are non-unique column names.

Other than `"check_unique"`, `.name_repair` accepts the following values:
- `"minimal"`: allows duplicate column names
- `"unique"`: generates non-empty unique names
- `"universal"`: generates unique and syntactic names
- A custom function or purrr anonymous function

The main difference between using `"unique"` and `"universal"` can be seen when your data contains columns with non-syntactic names, such as `` `x var` `` and `` `y var` `` which contains whitespace.

Using `.name_repair = "unique"`:

```r
tibble(`x var` = 1:3, `x var` = 4:6, .name_repair = "unique")
#> New names:
#> * `x var` -> `x var...1`
#> * `x var` -> `x var...2`
#> # A tibble: 3 x 2
#>   `x var...1` `x var...2`
#>         <int>       <int>
#> 1           1           4
#> 2           2           5
#> 3           3           6
```

Notice how the whitespace between `x` and `var` is preserved and the column names, ``x var...1`` and ``x var...2``, are still non-syntactic.

Using `.name_repair = "universal"`:

```r
tibble(`x var` = 1:3, `x var` = 4:6, .name_repair = "universal")
#> New names:
#> * `x var` -> x.var...1
#> * `x var` -> x.var...2
#> # A tibble: 3 x 2
#>   x.var...1 x.var...2
#>       <int>     <int>
#> 1         1         4
#> 2         2         5
#> 3         3         6
```

Now the columns have syntactic names, `x.var...1` and `x.var...2`.



### Using list-columns

`data.frame()` does not support lists as variables:

```r
data.frame(
  x = list(
    data.frame(y1 = 1:3, z1 = 4:6),
    data.frame(y2 = 1:3, z2 = 4:6)
  )
)
#>   x.y1 x.z1 x.y2 x.z2
#> 1    1    4    1    4
#> 2    2    5    2    5
#> 3    3    6    3    6
```

On the other hand, `tibble()` supports list-columns. This allows us to create data frames with lists as variables and nested data frames:

```r
tibble(
  x = list(
    tibble(y1 = 1:3, z1 = 4:6),
    tibble(y2 = 1:3, z2 = 4:6)
  )
)
#> # A tibble: 2 x 1
#>   x               
#>   <list>          
#> 1 <tibble [3 x 2]>
#> 2 <tibble [3 x 2]>
```


## Coercing to a tibble

We can coerce vectors, lists, matrices, or traditional data frames to tibbles.

The commonly used functions for doing this are `as_tibble()`, `as_tibble_row()`, and `as_tibble_col()`.

`as_tibble()` coerces objects, such as a matrix or traditional data frame into a tibble:

```r
class(mtcars)
#> [1] "data.frame"
as_tibble(mtcars)
#> # A tibble: 32 x 11
#>      mpg   cyl  disp    hp  drat    wt  qsec    vs    am  gear  carb
#>    <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
#>  1  21       6  160    110  3.9   2.62  16.5     0     1     4     4
#>  2  21       6  160    110  3.9   2.88  17.0     0     1     4     4
#>  3  22.8     4  108     93  3.85  2.32  18.6     1     1     4     1
#>  4  21.4     6  258    110  3.08  3.22  19.4     1     0     3     1
#>  5  18.7     8  360    175  3.15  3.44  17.0     0     0     3     2
#>  6  18.1     6  225    105  2.76  3.46  20.2     1     0     3     1
#>  7  14.3     8  360    245  3.21  3.57  15.8     0     0     3     4
#>  8  24.4     4  147.    62  3.69  3.19  20       1     0     4     2
#>  9  22.8     4  141.    95  3.92  3.15  22.9     1     0     4     2
#> 10  19.2     6  168.   123  3.92  3.44  18.3     1     0     4     4
#> # ... with 22 more rows
```

By default, `as_tibble()` coerces a vector into a single column tibble, but we can explicitly do it using `as_tibble_col()`:

```r
as_tibble_col(1:3)
#> # A tibble: 3 x 1
#>   value
#>   <int>
#> 1     1
#> 2     2
#> 3     3
```

On the other hand, if we want to coerce a vector into a single row tibble, we can use `as_tibble_row()`:

```r
as_tibble_row(1:3)
#> Error: Columns 1, 2, and 3 must be named.
#> Use .name_repair to specify repair.
#> Run `rlang::last_error()` to see where the error occurred.
```

Oops! Vectors does not contain any column names!
Just like `tibble()`, the `as_tibble()`, `as_tibble_col()`, and `as_tibble_row()` has a  `.name_repair` argument for fixing column names dynamically.

In this case, we want it to repair our column names by generating unique names:

```r
as_tibble_row(1:3, .name_repair = "unique")
#> New names:
#> * `` -> ...1
#> * `` -> ...2
#> * `` -> ...3
#> # A tibble: 1 x 3
#>    ...1  ...2  ...3
#>   <int> <int> <int>
#> 1     1     2     3
```


### Preserving row names

Instead of having row names, having a column that stores information about the row names is encouraged.

```r
head(mtcars)
#>                    mpg cyl disp  hp drat    wt  qsec vs am gear carb
#> Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
#> Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
#> Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
#> Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
#> Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
#> Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

By default, the rownames column is not added when coercing a traditional data frame to a tibble.

```r
as_tibble(mtcars)
#> # A tibble: 6 x 11
#>     mpg   cyl  disp    hp  drat    wt  qsec    vs    am  gear  carb
#>   <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
#> 1  21       6   160   110  3.9   2.62  16.5     0     1     4     4
#> 2  21       6   160   110  3.9   2.88  17.0     0     1     4     4
#> 3  22.8     4   108    93  3.85  2.32  18.6     1     1     4     1
#> 4  21.4     6   258   110  3.08  3.22  19.4     1     0     3     1
#> 5  18.7     8   360   175  3.15  3.44  17.0     0     0     3     2
#> 6  18.1     6   225   105  2.76  3.46  20.2     1     0     3     1
```

However, we can provide a custom column name to the `rownames` argument of `as_tibble()` to preserve the row names.

```r
as_tibble(mtcars, rownames = "car")
#> # A tibble: 32 x 12
#>    car                 mpg   cyl  disp    hp  drat    wt  qsec    vs    am  gear  carb
#>    <chr>             <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
#>  1 Mazda RX4          21       6  160    110  3.9   2.62  16.5     0     1     4     4
#>  2 Mazda RX4 Wag      21       6  160    110  3.9   2.88  17.0     0     1     4     4
#>  3 Datsun 710         22.8     4  108     93  3.85  2.32  18.6     1     1     4     1
#>  4 Hornet 4 Drive     21.4     6  258    110  3.08  3.22  19.4     1     0     3     1
#>  5 Hornet Sportabout  18.7     8  360    175  3.15  3.44  17.0     0     0     3     2
#>  6 Valiant            18.1     6  225    105  2.76  3.46  20.2     1     0     3     1
#>  7 Duster 360         14.3     8  360    245  3.21  3.57  15.8     0     0     3     4
#>  8 Merc 240D          24.4     4  147.    62  3.69  3.19  20       1     0     4     2
#>  9 Merc 230           22.8     4  141.    95  3.92  3.15  22.9     1     0     4     2
#> 10 Merc 280           19.2     6  168.   123  3.92  3.44  18.3     1     0     4     4
#> # ... with 22 more rows
```



## Printing a tibble

Unlike the traditional data frame, only the first ten rows and columns that fit on your screen's width are printed when printing a tibble.

```r
> as_tibble(mtcars)
#> # A tibble: 32 x 11
#>      mpg   cyl  disp    hp  drat    wt
#>    <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
#>  1  21       6  160    110  3.9   2.62
#>  2  21       6  160    110  3.9   2.88
#>  3  22.8     4  108     93  3.85  2.32
#>  4  21.4     6  258    110  3.08  3.22
#>  5  18.7     8  360    175  3.15  3.44
#>  6  18.1     6  225    105  2.76  3.46
#>  7  14.3     8  360    245  3.21  3.57
#>  8  24.4     4  147.    62  3.69  3.19
#>  9  22.8     4  141.    95  3.92  3.15
#> 10  19.2     6  168.   123  3.92  3.44
#> # ... with 22 more rows, and 5 more
#> #   variables: qsec <dbl>, vs <dbl>,
#> #   am <dbl>, gear <dbl>, carb <dbl>
```

Furthermore, tibble provides information on the remaining row count and column names that were not printed and the data type of each column.

This makes it convenient when we want to quickly inspect our dataset.



## Glimpsing a tibble

The tibble package provides many helper functions, one of which is the `glimpse()` function.

```r
glimpse(as_tibble(mtcars))
#> Rows: 32
#> Columns: 11
#> $ mpg  <dbl> 21.0, 21.0, 22.8, 21.4, 18.7, 18.1, 14.3, 24.4, 22.8,...
#> $ cyl  <dbl> 6, 6, 4, 6, 8, 6, 8, 4, 4, 6, 6, 8, 8, 8, 8, 8, 8, 4,...
#> $ disp <dbl> 160.0, 160.0, 108.0, 258.0, 360.0, 225.0, 360.0, 146....
#> $ hp   <dbl> 110, 110, 93, 110, 175, 105, 245, 62, 95, 123, 123, 1...
#> $ drat <dbl> 3.90, 3.90, 3.85, 3.08, 3.15, 2.76, 3.21, 3.69, 3.92,...
#> $ wt   <dbl> 2.620, 2.875, 2.320, 3.215, 3.440, 3.460, 3.570, 3.19...
#> $ qsec <dbl> 16.46, 17.02, 18.61, 19.44, 17.02, 20.22, 15.84, 20.0...
#> $ vs   <dbl> 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,...
#> $ am   <dbl> 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,...
#> $ gear <dbl> 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4,...
#> $ carb <dbl> 4, 4, 1, 1, 2, 1, 4, 2, 2, 4, 4, 3, 3, 3, 4, 4, 4, 1,...
```

`glimpse()` is similar to `str()` or a transposed `print()`. It allows us to inspect all the columns in the dataset and get basic information about the dimensions of the data.

This can be helpful when we have data with a lot of columns. Moreover, this function works with traditional data frames too!



## Subsetting a tibble

If you are familiar with the traditional data frame, you probably know that it coerces to a vector when a single column is accessed.

To demonstrate this, I will use the BOD dataset available in base R.

```r
BOD
#>   Time demand
#> 1    1    8.3
#> 2    2   10.3
#> 3    3   19.0
#> 4    4   16.0
#> 5    5   15.6
#> 6    7   19.8
```

It has two columns, `Time` and `demand`. We can access the `Time` column by using the `[` operator. The first argument will be empty as we want to access all the rows values.

```r
BOD[, "Time"]
#> [1] 1 2 3 4 5 7
```

This gives a vector output because the `drop` argument has a default value of `TRUE`.

```r
# This is the same as `BOD[, "Time"]`
BOD[, "Time", drop = TRUE]
#> [1] 1 2 3 4 5 7
```

We can explicitly set `drop` to `FALSE` to prevent it from coercing to a vector.

```r
BOD[, "Time", drop = FALSE]
#>   Time
#> 1    1
#> 2    2
#> 3    3
#> 4    4
#> 5    5
#> 6    7
```

On the other hand, the `[` operator for tibble has its `drop` argument set to `FALSE` by default.

```r
as_tibble(BOD)[, "Time"]
#> # A tibble: 6 x 1
#>    Time
#>   <dbl>
#> 1     1
#> 2     2
#> 3     3
#> 4     4
#> 5     5
#> 6     7
```

We can explicitly set `drop` to `TRUE` to force it to coerce to a vector.

```r
as_tibble(BOD)[, "Time", drop = TRUE]
#> [1] 1 2 3 4 5 7
```


## Partial matching

Traditional data frames support partial column matching through the `$` and `[[` operators.

For example, we can select the `Time` column of the `BOD` dataset with `T` as it partially matches only a single column in the data frame.

```r
# Partial Matching with `$`
> BOD$T
#> [1] 1 2 3 4 5 7
```

We can also perform partial column name matching using the `[[` operator, but we have to explicitly set the `exact` argument to `FALSE`.

```r
# Partial Matching with `[[`
BOD[["T", exact = FALSE]]
#> [1] 1 2 3 4 5 7
```

With tibble, partial column name matching is not supported and doing so will give a warning output.

```r
as_tibble(BOD)$T
#> NULL
#> Warning message:
#> Unknown or uninitialised column: `T`. 
```

Moreover, the `exact` argument will be ignored when using the `[[` operator.

```r
as_tibble(BOD)[["T", exact = FALSE]]
#> NULL
#> Warning message:
#> `exact` ignored.
```



## Summary

- A tibble is a data frame with `tbl_df` class with tweaked behaviors
- `tibble()` allows for tibble creation similar to that of a traditional data frame
- `tribble()` allows for row-wise tibble creation
- `tibble()` supports different ways to repair column names
- `tibble()` supports list-columns
- `as_tibble()` coerces an object (data frame, matrix, etc.) into a tibble
- tibble prints nicely according to your screen's width
- tibble stays as tibble, even when accessing a single column
- tibble does not support partial matching for column names



## Sources

- Documentation - [tibble.tidyverse.org](https://tibble.tidyverse.org)
- R for Data Science - [r4ds.had.co.nz/tibbles](https://r4ds.had.co.nz/tibbles)
- Source Code - [github.com/tidyverse/tibble](https://github.com/tidyverse/tibble)

There are still many things from the tibble package that I did not discuss in this blog post. These resources are useful for exploring more about the package.
