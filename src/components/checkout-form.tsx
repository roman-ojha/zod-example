import { useForm } from "react-hook-form";
import { z } from "zod";

const CheckoutForm = () => {
  // for Form you can use React-hook-form
  // RHF helps with:
  // 1) form validation
  // 2) error and loading states
  // 3) performance, prevents unnecessary re-renders

  // so we can do form validation with RHF but when ever that form data goes to backend we have to validate that form data, in that case rather then validating form from RHF and incoming data form Zod we will rather create the single schema and validate the data to backend and the frontend

  const signUpSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(10, "Password must be at least 10 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password must match",
      path: ["confirmPassword"],
    });

  type TSignUpSchema = z.infer<typeof signUpSchema>;

  // NOTE: bellow in elements we will going to use react-hook-form to manage the form state

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    // Here we will provide the validation resolver of Zod
    // resolver:zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {};

  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" name="" id="" />
      <input type="password" placeholder="Confirm Password" name="" id="" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
