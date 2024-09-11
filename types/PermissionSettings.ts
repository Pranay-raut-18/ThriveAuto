interface PermissionSettings {
  create?: boolean;
  edit?: boolean;
  view?: boolean;
  delete?: boolean;
}

async function setPermissionsForClass(
  page,
  className: string,
  permissions: PermissionSettings
) {
  // Map each permission action to its corresponding label in the DOM
  const permissionLocators = {
    create: page.locator(
      `p:has-text("${className}") >> .. >> label:has-text("Create") input`
    ),
    edit: page.locator(
      `p:has-text("${className}") >> .. >> label:has-text("Edit") input`
    ),
    view: page.locator(
      `p:has-text("${className}") >> .. >> label:has-text("View") input`
    ),
    delete: page.locator(
      `p:has-text("${className}") >> .. >> label:has-text("Delete") input`
    ),
  };

  // Handle "Create" checkbox
  if (permissions.create !== undefined) {
    const isChecked = await permissionLocators.create.isChecked();
    if (permissions.create && !isChecked) {
      await permissionLocators.create.check();
    } else if (!permissions.create && isChecked) {
      await permissionLocators.create.uncheck();
    }
  }

  // Handle "Edit" checkbox
  if (permissions.edit !== undefined) {
    const isChecked = await permissionLocators.edit.isChecked();
    if (permissions.edit && !isChecked) {
      await permissionLocators.edit.check();
    } else if (!permissions.edit && isChecked) {
      await permissionLocators.edit.uncheck();
    }
  }

  // Handle "View" checkbox
  if (permissions.view !== undefined) {
    const isChecked = await permissionLocators.view.isChecked();
    if (permissions.view && !isChecked) {
      await permissionLocators.view.check();
    } else if (!permissions.view && isChecked) {
      await permissionLocators.view.uncheck();
    }
  }

  // Handle "Delete" checkbox
  if (permissions.delete !== undefined) {
    const isChecked = await permissionLocators.delete.isChecked();
    if (permissions.delete && !isChecked) {
      await permissionLocators.delete.check();
    } else if (!permissions.delete && isChecked) {
      await permissionLocators.delete.uncheck();
    }
  }
}
