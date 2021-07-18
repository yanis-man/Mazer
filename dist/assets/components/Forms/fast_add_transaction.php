<br>
<form class="form form-vertical">
    <div class="form-body">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="first-name-vertical">Concerné</label>
                    <input type="text" id="first-name-vertical"
                        class="form-control" name="fname"
                        placeholder="Numéro de compte">
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="email-id-vertical">Montant</label>
                    <input type="email" id="email-id-vertical"
                        class="form-control" name="email-id"
                        placeholder="Email">
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="contact-info-vertical">Nature</label>
                    <select class="form-select" id="transactionTypeList">
                        <option value="0" disabled>Selectioner une nature</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="password-vertical">Libellé</label>
                    <input type="text" id="password-vertical"
                        class="form-control" name="contact"
                        placeholder="Achat de ..">
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <div class="form-check form-switch" id="setReccurrentTransaction">
                        <input class="form-check-input" type="checkbox" id="">
                        <label class="form-check-label" for="">Définir comme réccurrent</label>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end">
                <button type="submit"
                    class="btn btn-primary me-1 mb-1">Valider</button>
            </div>
        </div>
    </div>
</form>