<br>
<form class="form form-vertical">
    <div class="form-body">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="first-name-vertical">Type</label>
                        <select class="form-select" id="vehicleType">
                        </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="email-id-vertical">Plaque</label>
                    <input type="email" id="email-id-vertical"
                        class="form-control" name="email-id"
                        placeholder="XX000WW">
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="setToAnEmployee">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Attribuer à un employé</label>
                    </div>
                </div>
            </div>
            <div class="col-12" id="employeesList">
                <div class="form-group">
                    <label for="first-name-vertical">Employé</label>
                    <select class="form-select" id="employeeList">
                        <option>Yanis</option>
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