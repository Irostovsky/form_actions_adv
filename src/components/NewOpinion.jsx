import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const enteredValues = Object.fromEntries(formData);

    let errors = [];
    if (enteredValues.title.trim().length < 5) {
      errors.push("Title must be at least five characters long.");
    }
    if (
      enteredValues.body.trim().length < 10 ||
      enteredValues.body.trim().length > 300
    ) {
      errors.push("Your opinion must be between 10 and 300 characters long.");
    }

    if (errors.length) {
      return { errors, enteredValues };
    }

    await addOpinion(enteredValues);
    return { errors: null, success: true };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {formState.success && <p>Your opinion was submitted!</p>}
        <Submit />
      </form>
    </div>
  );
}
