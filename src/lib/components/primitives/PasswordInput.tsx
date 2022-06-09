import {
  Component,
  createSignal,
  createEffect,
  Show,
  mergeProps,
  Setter,
  Accessor,
} from "solid-js";

export interface PasswordInputProps {
  getData: Accessor<{
    value: string;
    error: string;
  }>;
  setData: Setter<{
    value: string;
    error: string;
  }>;
  minLength?: number;
  id?: string;
}

const PasswordInput: Component<PasswordInputProps> = (props) => {
  const merged = mergeProps(
    {
      minLength: 10,
      id: "",
    },
    props
  );

  const [valueInput, setValueInput] = createSignal("");

  createEffect(() => {
    if (valueInput().length > 0 && valueInput().length <= merged.minLength) {
      merged.setData({
        error: "Password too weak!",
        value: "",
      });

      return;
    }

    merged.setData({
      error: "",
      value: valueInput(),
    });
  });

  return (
    <div class="inline-flex flex-col">
      <input
        id={merged.id}
        onInput={(ev) => {
          /// @ts-ignore
          setValueInput(ev.target.value);
        }}
        onChange={(ev) => {
          /// @ts-ignore
          setValueInput(ev.target.value);
        }}
        type="password"
      />

      <Show when={merged.getData().error.length > 0}>
        <div>{merged.getData().error}</div>
      </Show>
    </div>
  );
};

export default PasswordInput;
