import React, { useContext, useLayoutEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import { useFormik } from "formik";
import { Post } from "../../api/post";
import AspectRatio from "../AspectRatio";
import { StoreContext } from "../../store/Store.context";
import { addPost, editPost, closeModal } from "../../store/Store.actions";
import * as Yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const Modal: React.FC<Props> = ({ open, onClose }) => {
  const {
    state: { modal, posts },
    dispatch,
  } = useContext(StoreContext);
  const [createPost, { loading: createLoading }] = Post.useCreate();
  const [updatePost, { loading: updateLoading }] = Post.useUpdate();
  const editingPost = posts?.filter((item) => item.id === modal.postId)[0];

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: PostSchema,
    initialValues: {
      title: "",
      content: "",
      image_url: "",
      lat: "",
      long: "",
      ...editingPost,
    },
    onSubmit: async (values, helpers) => {
      if (modal.type === "create") {
        const post = await createPost(values);
        dispatch(addPost(post));
      } else if (modal.type === "edit" && modal.postId && editingPost) {
        await updatePost(modal.postId, values);
        dispatch(editPost({ ...values, id: modal.postId }));
      }
      dispatch(closeModal());
      helpers.resetForm();
    },
  });

  useLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <Overlay open={open}>
      <ModalContainer open={open}>
        <ModalTitle>
          <Title>
            {modal.type === "create" ? "Create location" : "Update location"}
          </Title>
        </ModalTitle>
        <ModalContent>
          <Form onSubmit={formik.handleSubmit}>
            <Thumbnail
              ratio={1 / 2.65}
              src={formik.values.image_url}
              alt={formik.values.title}
            >
              <ImagePlaceholder>
                <span>Enter a valid url to display image</span>
              </ImagePlaceholder>
            </Thumbnail>
            <Input
              name="image_url"
              placeholder="https://yourimage.url"
              onChange={formik.handleChange}
              value={formik.values.image_url}
            />
            <Input
              name="title"
              aria-label="title"
              placeholder="Title (Required)"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Textarea
              name="content"
              aria-label="content"
              placeholder="Describe this location (Required)"
              onChange={formik.handleChange}
              value={formik.values.content}
            />
            <Grid>
              <Input
                name="lat"
                placeholder="Latitude"
                onChange={formik.handleChange}
                value={formik.values.lat}
              />
              <Input
                name="long"
                placeholder="Longitude"
                onChange={formik.handleChange}
                value={formik.values.long}
              />
            </Grid>
          </Form>
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            data-testid="submit"
            variant="contained"
            onClick={formik.submitForm}
            disabled={!formik.isValid || createLoading || updateLoading}
          >
            {modal.type === "create" ? "Create" : "Update"}
          </Button>
        </ModalActions>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div<Partial<Props>>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  transition: background-color 300ms ease;
  padding: 24px;

  ${({ open }) =>
    open
      ? css`
          background-color: rgba(0, 0, 0, 0.2);
          overflow: auto;
          max-height: 100vh;
        `
      : css`
          pointer-events: none;
          background-color: rgba(0, 0, 0, 0);
        `};
`;

const ModalContainer = styled.div<Partial<Props>>`
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  cursor: initial;
  transition: opacity 200ms ease;
  margin: auto 0;

  ${({ open }) =>
    open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `};
`;

const ModalTitle = styled.div`
  padding: 24px;
`;

const ModalContent = styled.div`
  padding: 0px 24px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
`;

const Title = styled.span`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;

  margin: 0;
  padding: 8px 12px;
  border: 1px solid #ededed;
  outline: none;

  margin-bottom: 16px;

  ::placeholder {
    color: grey;
  }
`;

const Textarea = styled.textarea`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;

  margin: 0;
  padding: 8px 12px;
  border: 1px solid #ededed;
  outline: none;

  margin-bottom: 16px;
  resize: none;
  height: 72px;
`;

const Thumbnail = styled(AspectRatio)`
  margin-bottom: 16px;
`;

const ImagePlaceholder = styled.div`
  border: 1px solid #ededed;
  color: grey;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -8px;

  & > input {
    margin: 8px;
    width: calc(100% / 2 - 16px);
  }
`;

export default Modal;
