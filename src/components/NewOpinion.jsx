import { useActionState } from "react";

export function NewOpinion() {
  const handleSubmit = async (prevState, formData) => {
    const fields = Object.fromEntries(formData);

    let errors = [];
    if (fields.body.trim().length < 6) {
      errors.push("Your opinion should be not less 6 characters");
    }

    if (errors.length) {
      return { errors, fields };
    }
    return { errors: null, success: true };
  };

  const [state, formAction] = useActionState(handleSubmit, {
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
              defaultValue={state.fields?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={state.fields?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={state.fields?.body}
          ></textarea>
        </p>

        {state.errors && (
          <ul>
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {state.success && <p>Your opinion was submitted!</p>}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
