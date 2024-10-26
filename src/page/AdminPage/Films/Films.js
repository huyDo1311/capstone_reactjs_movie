import React, { useCallback, useRef } from "react";
import { Button, Form, Table } from "antd";
import { Input, Tag, message } from "antd";
import { useState, useEffect } from "react";
import { movieService, adminService } from "../../../service/movieService";
import { NavLink, useNavigate } from "react-router-dom";
import { quanLyPhimService } from "../../../service/quanLyPhimService";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { delay } from "framer-motion";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const { Search } = Input;

export default function Films() {
  const [state, setState] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debounceTimeoutRef = useRef(null);

  let fetchListMovie = () => {
    quanLyPhimService
      .layDanhSachPhim()
      .then((result) => {
        setState(result.data.content);
      })
      .catch((err) => {
        console.log("🚀 ~ fetchListUser ~ err:", err);
      });
  };

  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((result) => {
        setState(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // Delete handler (example)

  let handleDelete = async (maPhim) => {
    try {
      let result = await quanLyPhimService.xoaPhim(maPhim);
      message.success("Xoá thành công");
      fetchListMovie();
      navigate("/admin/films");
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };

  // Tìm kiếm phim
  const handleSearch = useCallback(
    (value) => {
      quanLyPhimService
        .searchPhim(value)
        .then((result) => {
          if (result.data.content.length > 0) {
            setState(result.data.content);
          } else {
            // message.info("Không tìm thấy phim nào.");
            // fetchListMovie(); // Trở về danh sách phim ban đầu nếu không có kết quả
            setState('');
          }
        })
        .catch((err) => {
          console.log("🚀 ~ quanLyPhimService.searchPhim ~ err:", err);
        });
    },
    [fetchListMovie]
  );

  // const onSearchChange = (value) => {
  //   if (value.trim() !== '') {
  //     // Xóa timeout trước đó nếu có
  //     if (debounceTimeoutRef.current) {
  //       clearTimeout(debounceTimeoutRef.current);
  //     }

  //     // Thiết lập timeout mới
  //     debounceTimeoutRef.current = setTimeout(() => {
  //       handleSearch(value);
  //     }, 300); // Thời gian debounce là 300ms
  //   } else {
  //     fetchListMovie();
  //   }
  // };

  const onSearchChange = (value) => {
    // Trim leading and trailing spaces, and replace multiple spaces with a single space
    const trimmedValue = value.trim().replace(/\s+/g, '').toLowerCase();

    if (trimmedValue !== '') {
      // Clear previous timeout if it exists
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set a new timeout
      debounceTimeoutRef.current = setTimeout(() => {
        handleSearch(trimmedValue); // Call your search function with the cleaned input
      }, 300); // Debounce time is 300ms
    } else {
      fetchListMovie(); // Call to fetch the list of movies when the input is empty
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
      console.log("🚀 ~ handleDeleteAll ~ selectedRowKeys:", keys); // Log the selected keys here
    },
  };

  // const onDeleteAll = () => {
  //   // console.log("Deleting movies with IDs:", selectedRowKeys);
  //   setSelectedRowKeys([]);
  // };

  const columnsListMovie = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      render: (maPhim) => maPhim || "N/A",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (tenPhim) => tenPhim || "N/A",
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      render: (trailer) =>
        trailer ? (
          <a href={trailer} target="_blank" rel="noopener noreferrer">
            Xem Trailer
          </a>
        ) : (
          "Không có"
        ),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (imgSrc) =>
        imgSrc ? (
          <img src={imgSrc} alt="Hình ảnh phim" style={{ width: 100 }} />
        ) : (
          "Không có"
        ),
    },
    {
      title: "Ngày Khởi Chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      sorter: (a, b) => new Date(a.ngayKhoiChieu) - new Date(b.ngayKhoiChieu),
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Đánh Giá",
      dataIndex: "danhGia",
      key: "danhGia",
      sorter: (a, b) => a.danhGia - b.danhGia,
      render: (danhGia) => danhGia || "Chưa đánh giá",
    },
    {
      title: "Đang Chiếu",
      dataIndex: "dangChieu",
      key: "dangChieu",
      filters: [
        { text: "Đang chiếu", value: true },
        { text: "Không", value: false },
      ],
      onFilter: (value, record) => record.dangChieu === value,
      render: (isDangChieu) =>
        isDangChieu ? <Tag color="green">Có</Tag> : <Tag>Không</Tag>,
    },
    {
      title: "Sắp Chiếu",
      dataIndex: "sapChieu",
      key: "sapChieu",
      filters: [
        { text: "Sắp chiếu", value: true },
        { text: "Không", value: false },
      ],
      onFilter: (value, record) => record.sapChieu === value,
      render: (isSapChieu) =>
        isSapChieu ? <Tag color="blue">Có</Tag> : <Tag>Không</Tag>,
    },
    {
      title: "Hot",
      dataIndex: "hot",
      key: "hot",
      filters: [
        { text: "Hot", value: true },
        { text: "Không", value: false },
      ],
      onFilter: (value, record) => record.hot === value,
      render: (isHot) =>
        isHot ? <Tag color="red">Hot</Tag> : <Tag>Không</Tag>,
    },
    {
      title: "Thao Tác",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-between">
          <Button
            color="default"
            variant="solid"
            // onClick={() => handleDelete(record.maPhim)}
            className="mr-2"
            key={1}
          >
            <NavLink to={`/admin/films/edit/${record.maPhim}`}>Sửa</NavLink>
          </Button>
          <Button
            key={2}
            type="primary"
            danger
            className="mr-2"
            onClick={() => {
              if (window.confirm("Bạn có muốn xoá phim" + record.maPhim)) {
                handleDelete(record.maPhim);
                // navigate("/admin/films");
                window.location.href = "/admin/films";
              } else {
                navigate("/admin/films");
              }
              console.log("record.maPhim", record.maPhim);
            }}
          >
            Xoá
          </Button>
          <Button
            key={3}
            type="primary"
            blue

            onClick={() => {

            }}
          >
            Tạo lịch chiếu
          </Button>
        </div>
      ),
    },
  ];

  // Handle delete all selected movies
  const handleDeleteAll = async () => {
    // Confirm before deleting all selected movies
    console.log("🚀 ~ handleDeleteAll ~ selectedRowKeys:", selectedRowKeys);
    if (window.confirm("Bạn có chắc chắn muốn xoá tất cả phim đã chọn?")) {
      try {
        for (const maPhim of selectedRowKeys) {
          await quanLyPhimService.xoaPhim(maPhim); // Await the deletion of each movie
        }
        setSelectedRowKeys([]); // Clear selection after deletion
        message.success("Xoá tất cả phim thành công"); // Show success message after deletion
        fetchListMovie(); // Refresh the movie list
      } catch (error) {
        console.log("🚀 ~ handleDeleteAll ~ error:", error);
      }
    }
  };


  return (
    <div>
      <h3 className="text-4xl my-2">Quản lý phim</h3>
      {/* <Button
        onClick={() => {
          navigate("/admin/films/addnew");
        }}
      >
        Thêm film
      </Button>
      <Button
        type="primary"
        danger
        onClick={handleDeleteAll}
        disabled={selectedRowKeys.length === 0} // Disable if no selection
        className="ml-2"
      >
        Xoá tất cả
      </Button>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onChange={(e) => onSearchChange(e.target.value)}
        className="my-5"
      /> */}
      <Form layout="inline" className="d-flex items-center justify-content-centent">
        <Form.Item>
          <Button
            onClick={() => {
              navigate("/admin/films/addnew");
            }}
          >
            Thêm film
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            danger
            onClick={handleDeleteAll}
            disabled={selectedRowKeys.length === 0} // Disable if no selection
            className="ml-2"
          >
            Xoá tất cả
          </Button>
        </Form.Item>
        <Form.Item >
          <Search
            className="w-50 justify-end"
            placeholder="input search text"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Form.Item>
      </Form>

      <Table
        className="mt-5"
        rowKey={"maPhim"}
        rowSelection={rowSelection}
        columns={columnsListMovie}
        dataSource={state}
        onChange={() => { }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
}
