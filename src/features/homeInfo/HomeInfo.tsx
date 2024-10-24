import InfoText from "./components/InfoText";

function HomeInfo() {
  return (
    <>
      <InfoText label="Student info" value="64010090 John Doe" />
      <InfoText label="Group" value="20222421" />
      <InfoText label="Class date" value="Saturday, 07:00:00 - 18:00:00" />
      <div className="flex gap-2">
        <InfoText label="Year" value="2024" />
        <InfoText label="Semester" value="2" />
      </div>
      <InfoText label="Instructor" value="เกียรติณรงค์ ทองประเสริฐ" />
    </>
  );
}

export default HomeInfo;
