import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface PhotoPreviewProps {
    handleClose: Function;
    handleSubmit: Function;
}

export interface PhotoPreviewState {
    file: any;
}

export default class PhotoPreview extends React.Component<PhotoPreviewProps, PhotoPreviewState> {
    constructor(props: PhotoPreviewProps) {
        super(props);

        this.state = {
            file: ''
        };
    }
    cropper!: Cropper;

    handleSubmit = () => {
        let {file} = this.state;
        if (file) {            
            console.log('handle submit-', this.state.file);
            this.props.handleSubmit(file);
        }
    }

    handleCrop = () => {
        if (this.state.file) {
            this.cropImage();
        }
    }

  handleImageChange = (e: any) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
          this.setState({
              file: reader.result,
          });
      };
      reader.readAsDataURL(file);
  }

    cropImage = () => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            file: this.cropper.getCroppedCanvas().toDataURL()
        });
    }

    public render() {
        let {file} = this.state;
        let $imagePreview = null;

        if (file) {
            $imagePreview = (
            <Cropper
                src={file}
                ref={(ref: any) => { this.cropper = ref; }}
            />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image</div>);
        }

        return (
            <div className="previewComponent">
                    <div className="closeModal">
                        <Icon name="close" size="big" onClick={this.props.handleClose} />
                    </div>
                <form className="flex-column">
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this.handleImageChange(e)}
                    />
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                    <div id="buttonsCropModal">
                        <button className="cropButton" 
                            type="submit" 
                            onClick={(e) => this.handleCrop()}>Crop</button>
                        <button className="submitButton" 
                            type="submit" 
                            onClick={(e) => this.handleSubmit()}>Upload Image</button>
                    </div>
                </form>
            </div>
        );
    }
}
