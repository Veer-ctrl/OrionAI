import * as React from "react";
import { Controller, FormProvider } from "react-hook-form";

import { cn } from "@/lib/utils";

const FormFieldContext = React.createContext(null);

function useFormField() {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("FormField must be used within a FormField context.");
  }
  return context;
}

function Form({ children, ...form }) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

function FormField({ control, name, render }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldContext.Provider value={fieldState}>
          {render({ field })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

function FormItem({ className, ...props }) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FormLabel({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

function FormControl({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

function FormMessage({ children, className, ...props }) {
  const fieldState = useFormField();
  if (!fieldState?.error) {
    return null;
  }

  return (
    <p className={cn("text-sm text-destructive", className)} {...props}>
      {children ?? fieldState.error.message}
    </p>
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
