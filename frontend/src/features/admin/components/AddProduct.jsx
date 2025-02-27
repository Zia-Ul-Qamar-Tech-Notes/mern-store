import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
  updateProductByIdAsync,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const [addBrandCondition, setaddBrandCondition] = useState(false);
  const [addBrand, setAddBrand] = useState("");
  const [addCategoryCondition, setaddCategoryCondition] = useState(false);
  const [addCategory, setAddCategory] = useState("");

  const brandSubmit = (e) => {
    e.preventDefault();
    console.log(addBrand);
    navigate("/admin/add-product");
    fetch(`${process.env.REACT_APP_BASE_URL}/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: addBrand }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        }
      });
  };
  const categorySubmit = (e) => {
    e.preventDefault();
    navigate("/admin/add-product");
    console.log(addCategory);
    fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: addCategory }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        }
      });
  };

  useEffect(() => {
    if (productAddStatus === "fullfilled") {
      reset();
      toast.success("New product added");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Error adding product, please try again later");
    }
  }, [productAddStatus, brandSubmit, categorySubmit]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      images: [data.image0, data.image1, data.image2, data.image3],
    };
    delete newProduct.image0;
    delete newProduct.image1;
    delete newProduct.image2;
    delete newProduct.image3;

    dispatch(addProductAsync(newProduct));
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* feild area */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register("title", { required: "Title is required" })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select
                {...register("brand", { required: "Brand is required" })}
                labelId="brand-selection"
                label="Brand"
              >
                {brands.map((brand) => (
                  <MenuItem value={brand._id}>{brand.name}</MenuItem>
                ))}
              </Select>
              {addBrandCondition ? (
                <input
                  type="text"
                  value={addBrand}
                  onChange={(e) => setAddBrand(e.target.value)}
                />
              ) : null}
              <Button onClick={() => setaddBrandCondition(true)}>
                Add New Brand
              </Button>
              <Button onClick={brandSubmit}> Submit Brand</Button>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                {...register("category", { required: "category is required" })}
                labelId="category-selection"
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
              {addCategoryCondition ? (
                <input
                  type="text"
                  value={addCategory}
                  onChange={(e) => setAddCategory(e.target.value)}
                />
              ) : null}
              <Button onClick={() => setaddCategoryCondition(true)}>
                Add New Category
              </Button>
              <Button onClick={categorySubmit}> Submit Category</Button>
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Price is required" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? "%" : "Percentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "discount percentage is required",
                })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Stock Quantity
            </Typography>
            <TextField
              type="number"
              {...register("stockQuantity", {
                required: "Stock Quantity is required",
              })}
            />
          </Stack>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail
            </Typography>
            <TextField
              {...register("thumbnail", { required: "Thumbnail is required" })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Images
            </Typography>

            <Stack rowGap={2}>
              <TextField
                {...register("image0", { required: "Image is required" })}
              />
              <TextField
                {...register("image1", { required: "Image is required" })}
              />
              <TextField
                {...register("image2", { required: "Image is required" })}
              />
              <TextField
                {...register("image3", { required: "Image is required" })}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* action area */}
        <Stack
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={is480 ? 1 : 2}
        >
          <Button
            size={is480 ? "medium" : "large"}
            variant="contained"
            type="submit"
          >
            Add Product
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            variant="outlined"
            color="error"
            component={Link}
            to={"/admin/dashboard"}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
