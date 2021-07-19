<br>
<form class="form form-vertical" id="editRole">
    <div class="form-body">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="first-name-vertical">Concerné</label>
                        <select class="form-select" id="roleEmployeeList" name="employeeSelected">
                            <option value="0" disabled>Sélectionner un employé</option>
                        </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="email-id-vertical">Rôle actuel</label>
                    <input type="email" id="actual-role"
                        class="form-control" name="actualRole"
                        placeholder="" disabled>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="email-id-vertical">Nouveau rôle</label>
                    <select class="form-select" id="roleList" name="roleSelected">
                            <option value="0" disabled>Sélectionner un rôle</option>
                        </select>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end">
                <button type="submit"
                    class="btn btn-primary me-1 mb-1">Valider</button>
            </div>
        </div>
    </div>
</form>