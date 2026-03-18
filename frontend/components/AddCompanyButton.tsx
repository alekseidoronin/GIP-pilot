"use client";

import { Button } from "./ui/button";

export function AddCompanyButton() {
  function addCompany() {
    // MVP stub: wire to modal/form in next iteration.
    console.log("addCompany clicked");
  }

  return (
    <Button icon="plus" onClick={addCompany}>
      Добавить
    </Button>
  );
}
