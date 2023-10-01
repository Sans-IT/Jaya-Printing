import Link from "next/link";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="py-5">
      <h2>Posisi: Operator Sablon Plastik</h2>
      <p>
        Kami sedang mencari operator sablon plastik berpengalaman untuk
        bergabung dengan tim kami.
      </p>
      <p>Deskripsi Pekerjaan:</p>
      <ul>
        <li>Menyiapkan dan mengoperasikan sablon plastik</li>
        <li>Mengawasi proses sablon untuk memastikan kualitas cetakan</li>
        <li>Melakukan perawatan dan perbaikan jika diperlukan</li>
        {/* Tambahkan tanggung jawab lainnya */}
      </ul>
      <p>Kualifikasi:</p>
      <ul>
        <li>Pengalaman kerja sebagai operator sablon plastik</li>
        <li>Kemampuan untuk membaca cetakan dan mengatur dengan presisi</li>
        <li>Kemampuan bekerja dalam tim</li>
        {/* Tambahkan kualifikasi lainnya */}
      </ul>
      <p>
        Jika Anda tertarik dengan posisi ini, kirimkan resume Anda ke alamat
        email kami:{" "}
        <Link href="mailto:steven.sansit@gmail.com">
          steven.sansit@gmail.com
        </Link>
        .
      </p>
    </div>
  );
}

export default Page;
