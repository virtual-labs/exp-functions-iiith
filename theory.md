A function is an independent piece of code that takes input variables, performs a specific computation, and returns a result. Functions help break down large programs into smaller, manageable, and reusable modules. This makes code easier to maintain, debug, and extend.

Defining a function involves specifying its characteristics in a function prototype. The prototype describes the return type, function name, and the datatypes of input variables:

      return_type Function_name(datatype1, datatype2, ...);

For example, a function to compute the total payable amount after applying sales tax may have the following prototype:

      float compute_total(float subtotal, float tax_rate);

The function definition specifies how the computation is performed:

      float compute_total(float subtotal, float tax_rate) {
            float total;
            total = subtotal * (1 + (tax_rate / 100));
            return total;
      }

Here, the function accepts two float variables as input and returns a float value. The function can be called from the main program as:

      total = compute_total(1000, 8);

A complete C program using functions typically looks like:

      // Function prototypes
      float compute_total(float, float);

      int main() {
            float subtotal = 1000;
            float tax_rate = 8;
            float total = compute_total(subtotal, tax_rate);
            printf("Total payable: %f\n", total);
            return 0;
      }

      // Function definitions
      float compute_total(float subtotal, float tax_rate) {
            float total = subtotal * (1 + (tax_rate / 100));
            return total;
      }
