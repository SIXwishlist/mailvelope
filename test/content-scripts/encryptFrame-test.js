
import EncryptFrame from '../../src/content-scripts/encryptFrame';


describe('Encrypt Frame unit tests', function() {

  var ef, recip = [{email: 'jon@smith.com'}];

  beforeEach(function() {
    ef = new EncryptFrame();
    ef._currentProvider = {
      getRecipients: () => Promise.resolve([{email: 'jon@smith.com'}]),
      setRecipients: sinon.stub()
    };
  });

  afterEach(function() {});

  describe('_getRecipients', function() {
    beforeEach(function() {
      sinon.stub(ef, 'emit');
    });

    afterEach(function() {
      ef.emit.restore();
    });

    it('should work', function() {
      return ef._getRecipients()
      .then(() => {
        expect(ef.emit.withArgs('eframe-recipients', {recipients: recip}).calledOnce).to.be.true;
      });
    });
  });

  describe('_setEditorOutput', function() {
    beforeEach(function() {
      sinon.stub(ef, '_saveEmailText');
      sinon.stub(ef, '_normalizeButtons');
      sinon.stub(ef, '_setMessage');
    });

    it('should work', function() {
      ef._setEditorOutput({recipients: recip});

      expect(ef._currentProvider.setRecipients.withArgs({recipients: recip, editElement: null}).calledOnce).to.be.true;
    });
  });

});
