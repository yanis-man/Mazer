<br>
<form class="form form-vertical" id="registerNewVehicle">
    <div class="form-body">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="first-name-vertical">Type</label>
                        <select class="form-select" id="vehicleType" name="vehicleType">
                            <option disabled>Sélectionner un type</option>
                        </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="email-id-vertical">Plaque</label>
                    <input type="text" id="vehiclePlate"
                        class="form-control" name="vehiclePlate"
                        placeholder="XX000WW">
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="setToAnEmployee" name="setToAnEmployee">
                        <label class="form-check-label" for="setToAnEmployee">Attribuer à un employé</label>
                    </div>
                </div>
            </div>
            <div class="col-12" id="employeesList">
                <div class="form-group">
                    <label for="first-name-vertical">Employé</label>
                    <select class="form-select" id="employeeList" name="employeeList">
                    </select>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end">
                <button type="submit" id="sendNewVehicle"
                    class="btn btn-primary me-1 mb-1">Valider</button>
            </div>
        </div>
    </div>
</form>