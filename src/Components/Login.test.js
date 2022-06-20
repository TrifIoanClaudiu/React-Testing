import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import Login from "./Login"

jest.mock("axios", ()=>({

    __esModule:true,

    default:{
        get: () => ({
            data:{id:1, name:"John"}
        })
    }
}))

test("usernameinput should be rendered", () =>{
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    expect(userInputEl).toBeInTheDocument()
})

test("passwordinput should be rendered", () =>{
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument()
})


test("buttondinput should be rendered", () =>{
    render(<Login />);
    const buttondInputEl = screen.getByRole("button");
    expect(buttondInputEl).toBeInTheDocument()
})

test("usernameinput should be empty", () =>{
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    expect(userInputEl.value).toBe("");
})
test("passwordinput should be empty", () =>{
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe("");
})

test("button should be disabled", () =>{
    render(<Login />);
    const buttondInputEl = screen.getByRole("button");
    expect(buttondInputEl).toBeDisabled();
})

test("error message should be hidden", () =>{
    render(<Login />);
    const errorEl = screen.getByTestId('error');
    expect(errorEl).not.toBeVisible();
})

test("usernameinput should change", () =>{
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = "test"
    fireEvent.change(userInputEl, {target:{value:testValue}});
    expect(userInputEl.value).toBe(testValue);
})

test("password input should change", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
  
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

test("button should be disabled when input exists", () =>{
    render(<Login />);
    const buttondInputEl = screen.getByRole("button");
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test"

    fireEvent.change(userInputEl, {target:{value:testValue}});
    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    expect(buttondInputEl).not.toBeDisabled();
})

test("loading should not be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).not.toHaveTextContent(/please wait/i);
  });

  test("loading should be rendered when click", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
  
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);
  
    expect(buttonEl).toHaveTextContent(/please wait/i);
  });


  
  test("loading should not be rendered after fetching", async () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
  
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);
  
    await waitFor(()=>expect(buttonEl).not.toHaveTextContent(/please wait/i));
  });