def slide_window(x,width,increment):
    """ 
    Function takes the window width, window increment as its inputs variables and produces a sequence of overlapping lists from the input list. 
    For instance, given x=list(range(15)), the following is the output given a window width of 5 and window increment of 2.
   [[0, 1, 2, 3, 4],
    [2, 3, 4, 5, 6],
    [4, 5, 6, 7, 8],
    [6, 7, 8, 9, 10],
    [8, 9, 10, 11, 12],
    [10, 11, 12, 13, 14]]"""
    
    assert width > 0, "width should be greater than 0"
    assert increment > 0, "step should be greater than 0"
    assert len(x) > 0, "list can't be empty"
    length = len(x)
    loop = length - width + 1
    list = []
    for i in range(0, loop, increment):
        list.append(x[i:i+width])
    return list
