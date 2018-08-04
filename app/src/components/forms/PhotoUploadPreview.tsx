import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface PhotoPreviewProps {
    handleClose: Function;
    handleSubmit: Function;
}

export interface PhotoPreviewState {
    file: string; // ???
    crop: {
        x: number;
        y: number;
        width?: number;
        height?: number;
    };
    pixelCrop: any;
    cropResult: any;
    // cropper: Cropper;
}

export default class PhotoPreview extends React.Component<PhotoPreviewProps, PhotoPreviewState> {
    constructor(props: PhotoPreviewProps) {
        super(props);

        this.state = {
            file: '',
            cropResult: null,
            crop: {
                x: 20,
                y: 10,
                width: 160,
                height: 160
            },
            pixelCrop: ''
        };
    }
    cropper!: Cropper;

    handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('handle submit-', this.state.file);
        this.cropImage();
        this.props.handleSubmit();
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
            cropResult: this.cropper.getCroppedCanvas().toDataURL()
        });
    }

    public render() {
        let {file, cropResult} = this.state;
        let $imagePreview = null;
        let $imageCropPreview = null;

        if (file) {
            $imagePreview = (
            <Cropper
                src={file}
                ref={(ref: any) => { this.cropper = ref; }}
                // style={{ maxHeight: 400, width: '100%' }}
                // minHeight={160}
                // minWidth={160}
            />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image</div>);
        }

        if (cropResult) {
            $imageCropPreview = (<img
                                    src={cropResult}
                                    // style={{ maxHeight: 400, width: '100%', objectFit: 'contain'}} 
                                />);
        } else {
            $imageCropPreview = (<div className="previewText">Please Crop your Image</div>);
        }

        return (
            <div className="previewComponent">
                    <div className="closeModal">
                        <Icon name="close" size="big" onClick={this.props.handleClose} />
                    </div>
                <form className="flex-column" onSubmit={(e) => this.handleSubmit(e)}>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this.handleImageChange(e)}
                    />
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                    <div className="imgPreview" style={{ marginTop: 20}}>
                        {$imageCropPreview}
                    </div>
                    <button className="submitButton" 
                        type="submit" 
                        onClick={(e) => this.handleSubmit(e)}>Upload Image</button>
                </form>
            </div>
        );
    }
}
