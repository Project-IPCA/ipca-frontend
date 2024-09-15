import { Input, Select, Option } from "@material-tailwind/react";
import { UseFormRegister } from "react-hook-form";
import { ProfileInfo } from "../Profile";
import { ProfileData } from "../redux/profileSlice";

interface Props {
  register: UseFormRegister<ProfileInfo>;
  handleSelectChange: (value: string | undefined) => void;
  formData: ProfileData;
}

function Contact({ register, handleSelectChange, formData }: Props) {
  return (
    <>
      <Select
        label="Department"
        onChange={handleSelectChange}
        value={formData.profile.dept.dept_id}
        size="lg"
      >
        {formData.selected.departments.map((item, index) => (
          <Option key={index} value={item.dept_id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Input
        crossOrigin=""
        size="lg"
        placeholder="Email"
        label="Email"
        {...register("email")}
      />
      <Input
        crossOrigin=""
        size="lg"
        placeholder="Phone Number"
        label="Phone Number"
        {...register("tel")}
      />
    </>
  );
}

export default Contact;
