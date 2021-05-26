Function basically is a independent piece of code which takes some variables as input and returns a result. The function may optionally update the values of the input variables. Writing a function involves clearly specifying the characteristics of the funciton in its prototype. The prototype of a function looks like:

```
              return_type Function_name(datatypes_of_input_variables);
```

For example, the prototype of a function for computing tax and returning the total payable amount may look like:

```
              float compute_total(float ,float );
```

This states that the name of the function is compute_total. It accepts two float variables as input and returns a float value as output. Next, we define the function by writing the code corresponding to the computation of the return value of the function.


```
float compute_total(float subtotal,float tax_rate)
              {
                float total;
                total=subtotal*(1+(tax_rate/100));
                return total;
              }
```

The input variables in this function are named subtotal and tax_rate and both of them are of float datatype. The value which this function return will be type casted into float before returning. This function can be called from the main function as:

```
              total=compute_total(1000,8);
```

A complete code with functions may look like this:

```
              function_prototypes;
              main()
              {
              function_calls;
              }
              function definitions;

```