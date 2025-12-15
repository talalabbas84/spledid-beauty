"use client"

import { useId } from "react"
import { useForm, ValidationError } from "@formspree/react"
import clsx from "clsx"

type FormspreeEmailFormProps = {
  formId?: string
  formClassName?: string
  inputClassName?: string
  buttonClassName?: string
  buttonText: string
  placeholder?: string
  successMessage?: string
  successClassName?: string
}

export function FormspreeEmailForm({
  formId = "xgvgbkwk",
  formClassName,
  inputClassName,
  buttonClassName,
  buttonText,
  placeholder = "Enter your email",
  successMessage = "Thanks for joining!",
  successClassName,
}: FormspreeEmailFormProps) {
  const [state, handleSubmit] = useForm(formId)
  const inputId = useId()

  if (state.succeeded) {
    return (
      <div
        className={clsx(
          formClassName,
          "items-center justify-center text-sm font-semibold",
          successClassName ?? "text-[#1d1610]"
        )}
        role="status"
        aria-live="polite"
      >
        {successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <input
        id={inputId}
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className={inputClassName}
        aria-label="Email address"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} className="sr-only" />
      <button
        type="submit"
        disabled={state.submitting}
        className={clsx(buttonClassName, state.submitting && "cursor-not-allowed opacity-80")}
      >
        {state.submitting ? "Submitting..." : buttonText}
      </button>
    </form>
  )
}
